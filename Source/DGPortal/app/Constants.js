Ext.define('DGPortal.Constants', {
    singleton: true,
    API_URL_Sources: 'http://112.196.4.62:8080/dgDashboardRest/metadata/sources',
    API_URL_Operations: 'http://112.196.4.62:8080/dgDashboardRest/metadata/operations',
    API_URL:'https://192.168.2.209:8080/dgDashboardRest/metadata/sources',
    getNumberUnit: function (numberVal) {
        if (!isNaN(numberVal)) {
            // Nine Zeroes for Billions
            return Math.abs(Number(numberVal)) >= 1.0e+9

                ? Math.abs(Number(numberVal)) / 1.0e+9 + "B"
                // Six Zeroes for Millions 
                : Math.abs(Number(numberVal)) >= 1.0e+6

                    ? Math.abs(Number(numberVal)) / 1.0e+6 + "M"
                    // Three Zeroes for Thousands
                    : Math.abs(Number(numberVal)) >= 1.0e+3

                        ? Math.abs(Number(numberVal)) / 1.0e+3 + "K"

                        : Math.abs(Number(numberVal));
        }
    },
    getFileText: function (numberVal) {
        if (!isNaN(numberVal)) {
            return fileText = (numberVal > 1) ? 'FILES' : 'FILE';
        }
        return 'FILES';
    },
    getTableText: function (numberVal) {
        if (!isNaN(numberVal)) {
            return tableText = (numberVal > 1) ? 'TABLES' : 'TABLE';
        }
        return 'TABLES';
    }
});