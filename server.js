const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Главная страница - проверка работы
app.get('/', (req, res) => {
    res.json({ 
        status: '✅ Kaspi Analytics API работает на Railway!',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: 'POST /api/kaspi/auth',
            analytics: 'GET /api/kaspi/analytics'
        }
    });
});

// Демо авторизация
app.post('/api/kaspi/auth', (req, res) => {
    const { username, password } = req.body;
    
    console.log('Авторизация:', username);
    
    if (username && password) {
        res.json({
            success: true,
            token: 'railway_demo_' + Date.now(),
            user: {
                name: 'Магазин Kaspi на Railway',
                email: username,
                platform: 'Railway'
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Введите логин и пароль'
        });
    }
});

// Демо данные аналитики
app.get('/api/kaspi/analytics', (req, res) => {
    const demoData = {
        totalRevenue: 7832560,
        totalOrders: 1547,
        avgOrder: 4876,
        newCustomers: 442,
        revenueTrend: 15.5,
        ordersTrend: 10.3,
        avgOrderTrend: 2.1,
        customersTrend: 18.7,
        monthlyData: [4200, 4500, 4800, 5200, 5500, 5800, 6100, 6400, 6200, 6500, 6800, 7100],
        categories: [
            { name: 'Электроника', value: 38 },
            { name: 'Одежда', value: 22 },
            { name: 'Бытовая техника', value: 17 },
            { name: 'Книги', value: 8 },
            { name: 'Красота', value: 10 },
            { name: 'Другое', value: 5 }
        ],
        topProducts: [
            { name: 'iPhone 15 Pro', category: 'Электроника', quantity: 203, revenue: 6234100, rating: 4.9 },
            { name: 'Ноутбук Gaming', category: 'Электроника', quantity: 167, revenue: 5145600, rating: 4.7 },
            { name: 'Кофеварка Premium', category: 'Бытовая техника', quantity: 145, revenue: 4276500, rating: 4.8 },
            { name: 'Кроссовки Ultra', category: 'Обувь', quantity: 132, revenue: 2543200, rating: 4.6 },
            { name: 'Умные часы', category: 'Электроника', quantity: 118, revenue: 1854300, rating: 4.5 }
        ],
        server: 'Railway'
    };
    
    res.json(demoData);
});

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📍 Railway URL: ${process.env.RAILWAY_STATIC_URL || 'local'}`);
});
