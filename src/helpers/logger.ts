export function error(message:string): void {
 throw new Error(`[Rainstack] [ERROR]: ${message}`);
}

export function logError(message: string): void {
  console.error(`[Rainstack] [ERROR]: ${message}`);
}

export function logWarn(message: string): void {
  console.warn(`[Rainstack] [WARN]: ${message}`);
}

export function logInfo(message: string): void {
  console.info(`[Rainstack] [INFO]: ${message}`);
}