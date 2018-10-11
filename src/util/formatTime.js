export default {
    /**
     * 时间戳转年月日
     * @param nS
     * @returns {string}
     * parseInt的第二个参数有四种:2、8、10、16，分别对应二进制、八进制、十进制、十六进制；
     * 默认是:十进制；
     * 在转换时可以忽略第二个参数，这样js照样可以运行，但是在你进行语法校验时，JSLint却会报错
     */
    formatYMD: function (nS) {
        var da = new Date(parseInt(nS, 10));
        var year = da.getFullYear();
        var month = da.getMonth() + 1;
        var date = da.getDate();
        var ymdStr = [year, month, date].join('-');
        return ymdStr;
    },

    /**
     * 时间戳转年月日时分秒，完整时间显示
     * @param nS
     * @returns {string}
     */
    formatAllTime: function (nS) {
        var da = new Date(parseInt(nS, 10));
        var year = da.getFullYear();
        var month = da.getMonth() + 1;
        var date = da.getDate();
        var hour = da.getHours() + ":";
        var minutes = da.getMinutes() + ":";
        var sencond = da.getSeconds();
        var dayStr = [year, month, date].join('-');
        var dateStr = dayStr + " " + hour + minutes + sencond;
        return dateStr;
    },

    /**
     * 时间戳转时分秒
     * @param nS
     * @returns {string}
     */
    formatTime: function (nS) {
        var da = new Date(parseInt(nS, 10));
        var hour = da.getHours() + ":";
        var minutes = da.getMinutes();
        var dateStr = hour + minutes;
        return dateStr;
    },

    formatHM: function (nS) {
        var da = new Date(parseInt(nS));
        var hour = da.getHours() + ":";
        var minutes = da.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var hmStr = hour + minutes;
        return hmStr;
    },

    /**
     * 时间戳转月日
     * @param nS
     * @returns {string}
     */
    formatMD: function (nS) {
        var da = new Date(parseInt(nS, 10));
        var month = da.getMonth() + 1;
        var date = da.getDate();
        var ymdStr = [month, date].join('/');
        return ymdStr;
    },

    /**
     * 为十以内的数字加个0
     * @param num
     * @returns {*}
     */
    formatNum: function (num) {
        if (num < 10) {
            num = '0' + num
        }
        return num
    }
}

