//enums são tipos de campos que consistem em um conjunto fixo de constantes (final), sendo como uma lista de valores pré-definidos
//Determinar o periodo das leituras e da geração das candles

enum Period {
    TEN_SECONDS = 10000, //em milisegundos
    THIRTY_SECONDS = 30000,
    ONE_MINUTE = 60000,
    FIVE_MINUTES = 300000,
    TEN_MINUTES = 600000,
    HALF_HOUR = 1800000,
    HOUR = 3600000,
    DAY = 86400000
}

export default Period;