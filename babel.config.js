// module.exports = {
//   presets:
//   [
//     'module:metro-react-native-babel-preset',
//       'babel-preset-expo'
//       ],
//   plugins: [
//         ['module:react-native-dotenv']
//       ]
// };
module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-paper/babel',
                'module:react-native-dotenv',
        ],
        env: {
            production: {
            },
        },
    };
};
