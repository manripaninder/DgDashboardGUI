Ext.define('DGPortal.Constants', {
    singleton: true,
    API_URL_Sources: 'http://182.73.95.105:8080/dgDashboardRest/metadata/sources',
    API_URL_OnPremise_Operations: 'http://182.73.95.105:8080/dgDashboardRest/metadata/sources/categories/On-Premises/operations',
    API_URL_Cloud_Operations: 'http://182.73.95.105:8080/dgDashboardRest/metadata/sources/categories/Cloud/operations',
    OnPremise: 'ON-PREMISES',
    Cloud: 'CLOUD',
    All: 'ALL',
    KMGAUGE: 'KMGAUGE',  //KM Gauge chart
    C_L_CHART: 'C_L_CHART', //'Column chart' 
    COVTREND_CHART: 'COVTREND_CHART', //Coverage Trend chart
    HeaderNamesHashMap: undefined,
    //API_URL:'https://192.168.2.209:8080/dgDashboardRest/metadata/sources'
    appendUnit: function (sourceType, propName, propValue) {
        var result = propValue;
        var arEligibleProps = ['exposed', 'masked', 'maskedEncryted', 'monitored', 'cleaned', 'unscanned', 'encrytionDone',
            'protectedCount', 'fileTableCount'];
        if (sourceType && arEligibleProps.indexOf(propName) != -1) {
            if (sourceType.toUpperCase() == 'HADOOP') {
                result = result + ' ' + this.getFileText(result);
            } else if (sourceType.toUpperCase() == 'DBMS') {
                result = result + ' ' + this.getTableText(result);
            }
        }
        return result;
    },
    getNumberUnit: function (numberVal) {
        if (!isNaN(numberVal)) {
            // Nine Zeroes for Billions
            return Math.abs(Number(numberVal)) >= 1.0e+9

                ? Math.round(Math.abs(Number(numberVal)) / 1.0e+9) + "B"
                // Six Zeroes for Millions 
                : Math.abs(Number(numberVal)) >= 1.0e+6

                    ? Math.round(Math.abs(Number(numberVal)) / 1.0e+6) + "M"
                    // Three Zeroes for Thousands
                    : Math.abs(Number(numberVal)) >= 1.0e+3

                        ? Math.round(Math.abs(Number(numberVal)) / 1.0e+3) + "K"

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
    },
    getTwoDigitNum: function (num) {
        if (!isNaN(num)) {
            return num > 9 ? num.toString() : '0' + num;
        }
    },
    //set header names to HashMap
    setHeaderNamesHashMap: function () {
        this.HeaderNamesHashMap = new Ext.util.HashMap();
        this.HeaderNamesHashMap.add('source', 'SOURCE');
        this.HeaderNamesHashMap.add('policyId', 'POLICY ID');
        this.HeaderNamesHashMap.add('policyName', 'POLICY NAME');
        this.HeaderNamesHashMap.add('exposed', 'EXPOSED');
        this.HeaderNamesHashMap.add('location', 'LOCATION');
        this.HeaderNamesHashMap.add('totalFileCount', 'TOTAL FILE COUNT');
        this.HeaderNamesHashMap.add('totalTableCount', 'TOTAL TABLE COUNT');
        this.HeaderNamesHashMap.add('operationFileCount', 'OPERATION FILE COUNT');
        this.HeaderNamesHashMap.add('operationTableCount', 'OPERATION TABLE COUNT');
        this.HeaderNamesHashMap.add('protectionFileCount', 'PROTECTED FILE COUNT');
        this.HeaderNamesHashMap.add('protectionTableCount', 'PROTECTION TABLE COUNT');
        this.HeaderNamesHashMap.add('monitoredFileCount', 'MONITORED FILE COUNT');
        this.HeaderNamesHashMap.add('monitoredTableCount', 'MONITORED TABLE COUNT');
        this.HeaderNamesHashMap.add('unscannedFileCount', 'UNSCANNED FILE COUNT');
        this.HeaderNamesHashMap.add('unscannedTableCount', 'UNSCANNED TABLE COUNT');
        this.HeaderNamesHashMap.add('serverVersion', 'SERVER VERSION');
        this.HeaderNamesHashMap.add('serverDistribution', 'SERVER DISTRIBUTION');
        this.HeaderNamesHashMap.add('maskedEncryted', 'MASKED/ENCRYPTED');
        this.HeaderNamesHashMap.add('monitored', 'MONITORED');
        this.HeaderNamesHashMap.add('cleaned', 'CLEANED');
        this.HeaderNamesHashMap.add('unscanned', 'UNSCANNED');
        this.HeaderNamesHashMap.add('encrytionDone', 'ENCRYPTION DONE');
        this.HeaderNamesHashMap.add('protectedCount', 'PROTECTED COUNT');
        this.HeaderNamesHashMap.add('contentType', 'CONTENT TYPE');
        this.HeaderNamesHashMap.add('fileTableCount', 'FILE TABLE COUNT');
        this.HeaderNamesHashMap.add('masked', 'MASKED');
        this.HeaderNamesHashMap.add('trendMonth', 'TREND MONTH');
    }
});