module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue2-jest',
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    transformIgnorePatterns: [
        '/node_modules/swiper/swiper-bundle.css',
    ],
   
    
};
