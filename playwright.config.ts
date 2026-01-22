import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    reporter: [
        ['list'],              
        ['allure-playwright']  
    ],
    use:{
        headless: true, 
        viewport: {width: 1280, height: 720}, 
        actionTimeout: 15000, 
        ignoreHTTPSErrors: true, 
        video: 'off',
        screenshot: 'on', // 'on', 'off', 'only-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium'}
        },
        
        {
            name: 'Firefox',
            use: { browserName: 'firefox'}
        },

        {
            name: 'Webkit',
            use: { browserName: 'webkit'}
        }
    ]
}

export default config 