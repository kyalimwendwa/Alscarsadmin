const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const os = require('os');
const Chart = require('chart.js');
const app = express();
const port = 4000;
const moment = require('moment');
const fs = require('fs');


const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 });

// Configure PostgreSQL
const pool = new Pool({
    user: 'postgresql',
    host: 'database-1.cxiqek8mcodj.eu-west-2.rds.amazonaws.com', // Change 'localhost' to your host machine IP address or use 'host.docker.internal' to refer to the host machine
    database: 'projects',
    password: 'Aroot2024',
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    },
    max: 20
  });



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: '@Broot452wqrg', resave: false, saveUninitialized: true }));

// Routes
// ... (your existing code)



app.get('/', (req, res) => {
    res.redirect('/cars');
});

app.get('/list', async (req, res) => {
    try {
        // Query the database to get the necessary data
        const queryResult = await pool.query('SELECT exterior, interior, safety FROM cars LIMIT 1'); // Adjust the query as per your database structure

        // Extract data from the query result
        const carDetails = queryResult.rows[0];

        // Check if carDetails is defined and not null
        if (carDetails) {
            // Clean up the data by removing brackets and quotes
            const cleanData = {
                exterior: carDetails.exterior.replace(/[\[\]"]+/g, ''),
                interior: carDetails.interior.replace(/[\[\]"]+/g, ''),
                safety: carDetails.safety.replace(/[\[\]"]+/g, ''),
              };
              

            // Convert comma-separated values to arrays
            const exteriorArray = cleanData.exterior.split(',').map(value => value.trim());
            const interiorArray = cleanData.interior.split(',').map(value => value.trim());
            const safetyArray = cleanData.safety.split(',').map(value => value.trim());

            // Render the 'list.ejs' file and pass the data as locals
            res.render('list', {
                exteriorArray,
                interiorArray,
                safetyArray,
                // Add other data as needed
            });
        } else {
            // Handle the case where no car details are found
            res.status(404).send('Car details not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




app.get('/addproduct', (req, res) => {
    res.render('Addproduct')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/signup', upload.single('input-file'), async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    const client = await pool.connect(); // Acquire a client from the pool

    try {
        await client.query('BEGIN'); // Start a transaction

        // Check if email already exists
        const emailExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailExists.rowCount > 0) {
            return res.status(400).send('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let imageBuffer = null;

        // Check if a file has been uploaded
        if (req.file) {
            // Convert the buffer to a bytea hex string
            imageBuffer = req.file.buffer;
        }

        // Insert user into the database
        const result = await client.query('INSERT INTO users (name, email, password, profile) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, imageBuffer]);

        await client.query('COMMIT'); // Commit the transaction

        if (result.rowCount === 1) {
            // Store user data in session
            req.session.userId = result.rows[0].id;
            res.redirect('/');
        } else {
            res.status(500).send('Error inserting record');
        }
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        client.release(); // Release the client back to the pool
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Retrieve user from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
        // Compare hashed password
        const match = await bcrypt.compare(password, result.rows[0].password);

        if (match) {
            // Store user data in session
            req.session.userId = result.rows[0].id;
            res.redirect('/');
        } else {
            res.send('Invalid password');
        }
    } else {
        res.send('User not found');
    }
});

app.post('/addcars', upload.array('images', 12), async (req, res) => {
    try {
      const {
        make,
        model,
        name,
        year,
        mileage,
        body,
        seat,
        train,
        color,
        description,
        engine,
        enginesize,
        enginefuel,
        transmission,
        horsepower,
        torque,
        fuel,
        acceleration,
        condition,
        chassis,
        exterior,
        interior,
        safety,
        stock,
        price,
      } = req.body;
  
      // Convert comma-separated values to arrays
      const exteriorArray = exterior.split(',').map(value => value.trim());
      const interiorArray = interior.split(',').map(value => value.trim());
      const safetyArray = safety.split(',').map(value => value.trim());
  
      // Convert the array of images to bytea format
      const mainImage = Buffer.from(req.files[0].buffer);
      const otherImages = req.files.slice(1).map(file => Buffer.from(file.buffer));
  
      // Insert data into PostgreSQL database
      const result = await pool.query(
        'INSERT INTO cars (make, model, name, year, mileage, body, seat, train, color, description, engine, enginesize, enginefuel, transmission, horsepower, torque, fuel, acceleration, condition, chassis, exterior, interior, safety, stock, price, mainImage, otherImages) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)',
        [
          make,
          model,
          name,
          year,
          mileage,
          body,
          seat,
          train,
          color,
          description,
          engine,
          enginesize,
          enginefuel,
          transmission,
          horsepower,
          torque,
          fuel,
          acceleration,
          condition,
          chassis,
          exteriorArray.join(), // Join the array elements without brackets
          interiorArray.join(), // Join the array elements without brackets
          safetyArray.join(),   // Join the array elements without brackets
          stock,
          price,
          mainImage,
          otherImages,
        ]
      );
      
  res.redirect('/addproduct')
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.get('/cars', async (req, res) => {
    try {
        let cachedData = cache.get("carsData");
        if (cachedData) {
            return res.render('cars', cachedData);
        }

        const client = await pool.connect();

        // Fetch all car IDs
        const carIdsResult = await client.query('SELECT id FROM cars');
        const carIds = carIdsResult.rows.map(row => row.id);

        // Query to count the total number of orders
        const countResult = await client.query('SELECT COUNT(*) FROM placedorders');
        const totalCount = countResult.rows[0].count; // Extracting the count value

        const completedCountResult = await client.query('SELECT COUNT(*) FROM placedorders WHERE status = $1', ['Completed']);
        const completedCount = completedCountResult.rows[0].count; // Extracting the count value for completed orders

        // Calculating pending orders count
        const pendingCount = totalCount - completedCount;

        const totalPaymentAmountResult = await client.query('SELECT SUM(CAST(REPLACE(payment_amount, \',\', \'\') AS NUMERIC)) AS total_payment_amount FROM placedorders');
        const totalPaymentAmount = totalPaymentAmountResult.rows[0].total_payment_amount;

        const formattedTotalPaymentAmount = numberWithCommas(totalPaymentAmount);

        // Query to get today's date in the format 'YYYY-MM-DD'
        const today = new Date().toISOString().split('T')[0];

        // Query to get payment amounts for today's orders
        const todayPaymentAmountResult = await client.query('SELECT payment_amount FROM placedorders WHERE date = $1', [today]);
        const todayPaymentAmounts = todayPaymentAmountResult.rows.map(row => parseFloat(row.payment_amount));

        const chartData = [['Date', 'Payment Amount']];
        for (let i = 0; i < todayPaymentAmounts.length; i++) {
            chartData.push([`Order ${i + 1}`, todayPaymentAmounts[i]]);
        }

        // Fetching car data
        const result = await pool.query('SELECT id, mainImage, stock, price, name FROM cars');
        const cars = result.rows;

        // Convert mainImage from bytea to Base64
        const carsWithImages = cars.map(car => {
            const mainImageBuffer = car.mainimage; // Use the correct column name
            const mainImageBase64 = mainImageBuffer.toString('base64');
            return { ...car, mainImage: mainImageBase64 };
        });

        const query = 'SELECT cars.*, car_views.views FROM cars JOIN car_views ON cars.id = car_views.car_id ORDER BY car_views.views DESC LIMIT 5';
        const { rows } = await pool.query(query);
        const mostViewedCars = rows.map((car) => {
            const mainImageBuffer = car.mainimage;
            const mainImageBase64 = mainImageBuffer ? `data:image/jpeg;base64,${Buffer.from(mainImageBuffer).toString('base64')}` : null;
            return { 
                ...car, 
                mainImage: mainImageBase64,
                price: car.price,
                stock: car.stock,
                condition: car.condition,
                engineFuel: car.enginefuel,
                transmission: car.transmission,
                engineSize: car.enginesize,
                year: car.year,
                mileage: car.mileage,
                body: car.body,
                train: car.train
            };
        });

        const responseData = { 
            cars: carsWithImages,
            carIds, // Pass the car IDs
            mostViewedCars,
            totalCount,
            completedCount,
            pendingCount,
            formattedTotalPaymentAmount,
            chartData
        };

        // Cache the data
        cache.set("carsData", responseData);

        client.release();

        res.render('cars', responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Function to format number with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

app.get('/orders', async (req, res) => {
    try {
        const client = await pool.connect();
        // Query to count the total number of orders
        const countResult = await client.query('SELECT COUNT(*) FROM placedorders');
        const totalCount = countResult.rows[0].count; // Extracting the count value

        const completedCountResult = await client.query('SELECT COUNT(*) FROM placedorders WHERE status = $1', ['Completed']);
        const completedCount = completedCountResult.rows[0].count; // Extracting the count value for completed orders
        
        
        
        // Calculating pending orders count
        const pendingCount = totalCount - completedCount;

        const completedOrdersResult = await client.query('SELECT * FROM placedorders WHERE status = $1', ['Completed']);
        const completedOrders = completedOrdersResult.rows;

        // Query to fetch pending orders
        const pendingOrdersResult = await client.query('SELECT * FROM placedorders WHERE status = $1', ['pending']);
        const pendingOrders = pendingOrdersResult.rows;


        // Query to fetch all orders
        const result = await client.query('SELECT * FROM placedorders');
        const orders = result.rows;
        client.release();

        res.render('order', { orders: orders, totalCount ,completedCount, pendingCount ,completedOrders,pendingOrders}); // Pass totalCount to the rendering template
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ message: 'An error occurred while fetching orders' });
    }
});


app.post('/orders', async (req, res) => {
    const { customer, phone_number,email_address, car_name, year_of_manufacture,color,supplier, location,destination,shipping_method,shipping_timeline,payment_method, payment_amount, car_loan_period, date,status,completion_date } = req.body;
    try {

      const client = await pool.connect();
      const result = await client.query('INSERT INTO placedorders (customer, phone_number,email_address, car_name, year_of_manufacture,color,supplier, location,destination,shipping_method,shipping_timeline,payment_method, payment_amount, car_loan_period, date,status,completion_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *', [customer, phone_number,email_address, car_name, year_of_manufacture,color,supplier, location,destination,shipping_method,shipping_timeline,payment_method, payment_amount, car_loan_period, date,'pending',completion_date]);
      const order = result.rows[0];
      client.release();

      res.redirect('/orders');
     
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ message: 'An error occurred while storing data' });
    }
  });



  app.get('/viewmore/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      // Fetch order details by ID from PostgreSQL
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM placedorders WHERE id = $1', [id]);
      const order = result.rows[0];
      client.release();
  
      res.render('viewmore', { order });
    } catch (err) {
      console.error('Error fetching order details', err);
      res.status(500).send('Error fetching order details');
    }
  });

app.get('/cardetail/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        // Fetch the details of the selected car by its ID
        const query = 'SELECT * FROM cars WHERE id = $1';
        const { rows } = await pool.query(query, [carId]);
        const carDetails = rows[0]; // Assuming there's only one car with the given ID

        if (!carDetails) {
            return res.status(404).send('Car not found');
        }

        // Convert exterior, interior, and safety fields back to arrays
        carDetails.exterior = carDetails.exterior.split(',').map(value => value.trim());
        carDetails.interior = carDetails.interior.split(',').map(value => value.trim());
        carDetails.safety = carDetails.safety.split(',').map(value => value.trim());

        // Convert mainImage from bytea to Base64
        const mainImageBuffer = carDetails.mainimage; // Use the correct column name
        const mainImageBase64 = mainImageBuffer.toString('base64');

        // Convert other images from Buffer to Base64
        const otherImagesBase64 = carDetails.otherimages.map(imageBuffer => imageBuffer.toString('base64'));

        const carWithImages = { ...carDetails, mainImage: mainImageBase64, otherImages: otherImagesBase64 };

        res.render('cardetails', { car: carWithImages }); // Render the cardetails.ejs file with car details
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/updatecar/:id', upload.array('images', 12), async (req, res) => {
    try {
        const id = req.params.id; // Use id instead of name to identify the car
        
        const {
            make,
            model,
            year,
            mileage,
            body,
            seat,
            train,
            color,
            description,
            engine,
            enginesize,
            enginefuel,
            transmission,
            horsepower,
            torque,
            fuel,
            acceleration,
            condition,
            chassis,
            exterior,
            interior,
            safety,
            stock,
            price,
        } = req.body;

        // Convert comma-separated values to arrays
        const exteriorArray = exterior.split(',').map(value => value.trim());
        const interiorArray = interior.split(',').map(value => value.trim());
        const safetyArray = safety.split(',').map(value => value.trim());

        // Retrieve mainImage from the request
        const mainImage = req.files && req.files[0] ? req.files[0].buffer : null;
        
        // Retrieve otherImages from the request
        const otherImages = req.files ? req.files.slice(1).map(file => file.buffer) : [];

        // Update data in PostgreSQL database
        const result = await pool.query(
            `UPDATE cars 
            SET make = $1, model = $2, year = $3, mileage = $4, body = $5, seat = $6, 
            train = $7, color = $8, description = $9, engine = $10, enginesize = $11, 
            enginefuel = $12, transmission = $13, horsepower = $14, torque = $15, fuel = $16, 
            acceleration = $17, condition = $18, chassis = $19, exterior = $20, interior = $21, 
            safety = $22, stock = $23, price = $24, mainImage = $25, otherImages = $26 
            WHERE id = $27`,
            [
                make,
                model,
                year,
                mileage,
                body,
                seat,
                train,
                color,
                description,
                engine,
                enginesize,
                enginefuel,
                transmission,
                horsepower,
                torque,
                fuel,
                acceleration,
                condition,
                chassis,
                exteriorArray.join(),
                interiorArray.join(),
                safetyArray.join(),
                stock,
                price,
                mainImage,
                otherImages,
                id,
            ]
        );

        // Redirect to the car details page after successful update
        res.redirect(`/cars`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/messages', async (req, res) => {
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM car_enquiries';
      const result = await client.query(query);
      res.render('message', { messages: result.rows });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });






app.post('/completeorders/:id', async (req, res) => {
    const orderId = req.params.id;
    const { completion_date } = req.body;
    
    try {
        const client = await pool.connect();
        
        // Update the placedorders table to set completion_date and status to Completed for the specified order ID
        const result = await client.query('UPDATE placedorders SET completion_date = $1, status = $2 WHERE id = $3', [completion_date, 'Completed', orderId]);
        
        client.release();
        
        res.redirect('/orders');
    } catch (error) {
        console.error('Error completing order:', error);
        res.status(500).json({ message: 'An error occurred while completing the order' });
    }
});









app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
