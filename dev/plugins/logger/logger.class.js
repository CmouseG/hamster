const _init = Symbol('init')
const _$ = Symbol('_$')
let privateProp = new WeakMap()

/**
 * 日志类
 */
export default class Logger {
    /**
     * 静态属性
     * @param {number}  THRESHOLD_LEV       阀值
     * @param {number}  DEFAULT_LEV         默认级别
     * @param {number}  ALL_LEV             级别数
     * @param {array}   LEVELS              级别项
     * @param {number}  MAX_SIZE            缓存大小
     * @param {string}  STORAGE_KEY        缓存key
     */
    static THRESHOLD_LEV = -1
    static DEFAULT_LEV = 1
    static ALL_LEV = 6
    static LEVELS = ['debug', 'info', 'warn', 'error']
    static MAX_SIZE = 1 * 1024 * 1024
    static STORAGE_KEY = 'H5LOG_LOCALSTORAGE_KEY'
    static INSTANCE = null
    static POOL = []
    constructor(options = {}) {
        let _privateProp = {
            _CURRENT_SIZE: 1,
            _SUBSCRIBERS: []
        }
        privateProp.set(this, _privateProp)

        /**
         * 成员属性
         * @param {number | string} CURRENT_LEV 当前级别
         * @param {object} TAG                  标记
         * @param {object} CONTENT              内容
         * @param {number} TIME                 时间戳
         */
        const {
            lev,
            tag,
            content,
            time = Date.now()
        } = options
        this.lev = lev
        this.tag = typeof tag === 'string' ? tag : JSON.stringify(tag)
        this.content = typeof content === 'string' ? content : JSON.stringify(content)
        this.time = time
        this.options = options

        // 计算中英文混合字节数,81为转json后多出的字符数
        this.bytesSize = this.getStrBtSize(this.tag) + this.getStrBtSize(this.content) + 81
        this.bytesSize += this.bytesSize.toString().length
        // 初始化
        this[_init](options)
    }
    [_init](options) {
        let logStr = window.localStorage[Logger.STORAGE_KEY]
        if (logStr) {
            try {
                Logger.POOL = JSON.parse(logStr)
                Logger.POOL.forEach((item) => {
                    this[_$]()._CURRENT_SIZE += item.bytesSize
                })
            } catch (e) {
                Logger.POOL = []
                console.log('h5_log', '读取日志失败！日志已被重置。\n' + e.stack)
            }
        }
        this.log(options)
    }
    [_$]() {
        return privateProp.get(this)
    }
    static getInstance(data) {
        if (!Logger.INSTANCE) {
            Logger.INSTANCE = new Logger(data)
            return Logger.INSTANCE
        }
        Logger.INSTANCE.log(data)
        return Logger.INSTANCE
    }
    static getPoor() {
        return Logger.POOL
    }
    subscribe(fn) {
        const subs = this[_$]()._SUBSCRIBERS
        if (subs.indexOf(fn) < 0) {
            subs.push(fn)
        }
        return () => {
            const i = subs.indexOf(fn)
            if (i > -1) {
                subs.splice(i, 1)
            }
        }
    }

    /**
     * 记录日志
     * @param  {number} lev     日志级别
     * @param  {object} tag     日志标签
     * @param  {object} content 日志内容
     */
    log(args) {
        let l = -1
        const {lev, tag, content} = {...args}
        // 参数校验lev需要对应级别
        if (arguments.length === 3) {
            if (isNaN(lev)) {
                l = this.LEVELS.indexOf(lev)
            } else {
                l = parseInt(lev)
            }
        } else if (arguments.length === 2) {
            l = this.DEFAULT_LEV
        }
        // 级别不够 或参数为空
        if (l < this.THRESHOLD_LEV || !tag) {
            return
        }
        // 异步记录日志
        setTimeout(() => {
            this.save(lev, tag, content || '')
        }, 1)
    }

    /**
     * 存储符合条件的日志
     * @param  {number} lev     级别
     * @param  {object} tag     标记
     * @param  {object} content 内容
     *
     */
    save(lev, tag, content) {
        // let [diffValue, tmp] = [Logger.MAX_SIZE - this[_$]()._CURRENT_SIZE - this.bytesSize, []]
        // 保证日志字节数小于限制diffValue < 0 &&
        /* while (diffValue < 0 && Logger.POOL.length) {
            console.log(Logger.POOL)
            tmp = Logger.POOL.pop()
            diffValue += tmp.bytesSize
            this[_$]()._CURRENT_SIZE = tmp.bytesSize

            // 最后一个对象字节数大于限制
            if (diffValue < 0) {
                return
            }

            // update _CURRENT_SIZE
            this[_$]()._CURRENT_SIZE += this.bytesSize
            // save memory
            Logger.POOL.unshift(this)
            // publish
            this[_$]()._SUBSCRIBERS.forEach((cb) => cb(this))
            // save cache
            window.localStorage.setItem(Logger.STORAGE_KEY, Logger.POOL)
        }*/
        if (Logger.MAX_SIZE && ((this[_$]()._CURRENT_SIZE + this.bytesSize) < Logger.MAX_SIZE)) {
            Logger.POOL.unshift(this.options)
            window.localStorage.setItem(Logger.STORAGE_KEY, JSON.stringify(Logger.POOL))
        } else if (!Logger.POOL.length) {
            Logger.POOL.push(this.options)
            window.localStorage.setItem(Logger.STORAGE_KEY, JSON.stringify(Logger.POOL))
        }
    }

    /**
     * 读取日志
     * @param  {int | string}   lev     日志级别 6：所有级别，级别不做过滤条件
     * @param  {string}         keyword 关键字 过滤出tag、content中含关键字的日志
     * @return {array}                  过滤后的数组
     */
    static readLog(lev, keyword) {
        Logger.POOL = JSON.parse(window.localStorage[Logger.STORAGE_KEY])
        let [l, reg] = ['', new RegExp(keyword || '', 'i')]
        if (lev === undefined) {
            return Logger.POOL.slice(0)
        }
        if (isNaN(lev)) {
            l = Logger.LEVELS.indexOf(lev)
        } else {
            l = parseInt(lev)
        }
        return Logger.POOL.filter(item => {
            // 按lev、tag、content过滤  级别为6忽略
            return (l === Logger.ALL_LEV || l === item.lev) && (~item.tag.search(reg) || ~item.content.search(reg))
        })
    }

    /**
     * 按UTF-8编码计算字符串所占字节数
     * @param  {string} s 需要计算的字符日
     * @return {number}   字符串所占字节数
     */
    getStrBtSize(s) {
        let [totalLength, charCode, i] = [0, '', 0]
        for (i in s) {
            charCode = s.charCodeAt(i)
            if (charCode < 0x007f) {
                totalLength = totalLength + 1
            } else if (charCode >= 0x0080 && charCode <= 0x07ff) {
                totalLength += 2
            } else if (charCode >= 0x0800 && charCode <= 0xffff) {
                totalLength += 3
            }
        }
        return totalLength
    }

    /**
     * 设置阀值  低于阀值的级别不会被记录
     * @param {number | string} v [日志级别]
     *
     */
    static setThreshold(v) {
        Logger.THRESHOLD_LEV = isNaN(v) ? Logger.LEVELS.indexOf(v) : parseInt(v)
    }

    /**
     * 设置日志最大字节数
     * @param {number} v 最大值
     *
     */
    setMaxSize(v) {
        if (!isNaN(v)) {
            Logger.MAX_SIZE = Number(v)
        }
    }

    static getStoreKey() {
        let stores = window.localStorage.getItem(Logger.STORAGE_KEY)
        return stores
    }
}

Logger.install = function(cb) {
    console.log(cb)
}
