const CracoLessPlugin = require('craco-less')

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': 'rgb(0, 82, 204)',
                            '@face-size-base': '16px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
