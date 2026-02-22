/**
 * Production-ready logging utility
 * Supports different log levels and can be extended with external services
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
  context?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private log(level: LogLevel, message: string, data?: unknown, context?: string): void {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      context,
    };

    // In development, log to console
    if (this.isDevelopment) {
      const consoleMethod = level === 'error' ? console.error : 
                           level === 'warn' ? console.warn : 
                           level === 'info' ? console.info : 
                           console.log;
      
      consoleMethod(`[${level.toUpperCase()}]`, message, data || '');
    }

    // In production, you can send to external logging service
    // Example: Sentry, LogRocket, etc.
    if (this.isProduction && level === 'error') {
      // TODO: Integrate with error tracking service
      // Example: Sentry.captureException(new Error(message), { extra: data });
    }
  }

  debug(message: string, data?: unknown, context?: string): void {
    if (this.isDevelopment) {
      this.log('debug', message, data, context);
    }
  }

  info(message: string, data?: unknown, context?: string): void {
    this.log('info', message, data, context);
  }

  warn(message: string, data?: unknown, context?: string): void {
    this.log('warn', message, data, context);
  }

  error(message: string, error?: unknown, context?: string): void {
    const errorData = error instanceof Error 
      ? { message: error.message, stack: error.stack, name: error.name }
      : error;
    
    this.log('error', message, errorData, context);
  }
}

export const logger = new Logger();
