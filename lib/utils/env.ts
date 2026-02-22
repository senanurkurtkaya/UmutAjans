/**
 * Environment variable validation and access
 */

/**
 * Get environment variable with optional default value
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  
  return value ?? defaultValue ?? '';
}

/**
 * Get boolean environment variable
 */
export function getEnvBoolean(key: string, defaultValue = false): boolean {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Get number environment variable
 */
export function getEnvNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (!value && defaultValue !== undefined) return defaultValue;
  if (!value) throw new Error(`Environment variable ${key} is required but not set`);
  
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Environment variable ${key} must be a valid number, got: ${value}`);
  }
  
  return num;
}

/**
 * Validate required environment variables
 */
export function validateEnv(requiredVars: string[]): void {
  const missing: string[] = [];
  
  for (const key of requiredVars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}
