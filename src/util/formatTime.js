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
}

