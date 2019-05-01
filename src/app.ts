import dotenv from 'dotenv';
import logger from './core/logger';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

logger.warn('Hey');
