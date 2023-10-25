import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import menuRoutes from './routes/menu.routes.js'
import placeRoutes from './routes/place.routes.js'
import serviceRoutes from './routes/service.routes.js'
import processRoutes from './routes/process.routes.js'
import mapRoutes from './routes/map.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());

app.use('/api', authRoutes)
app.use('/api', menuRoutes)
app.use('/api', placeRoutes)
app.use('/api', serviceRoutes)
app.use('/api', processRoutes)
app.use('/api', mapRoutes)

export default app