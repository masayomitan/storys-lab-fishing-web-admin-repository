interface Config {
	apiBaseUrl: string
	isAppProduction: boolean
	isAppDevelopment: boolean
	isAppLocal: boolean
	isProduction: boolean
	isDevelopment: boolean
	isTest: boolean
}
const config: Config = {
	apiBaseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:80/api',
	isAppProduction: process.env.NEXT_PUBLIC_APP_ENV === 'production',
	isAppDevelopment: process.env.NEXT_PUBLIC_APP_ENV === 'development',
	isAppLocal: process.env.NEXT_PUBLIC_APP_ENV === 'local',
	isProduction: process.env.NODE_ENV === 'production',
	isDevelopment: process.env.NODE_ENV === 'development',
	isTest: process.env.NODE_ENV === 'test',
}
export default config
