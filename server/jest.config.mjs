export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["./tests"],
    transform:{
        "^.+\\.ts?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}