
const isObject = (value) => {
    return value === Object(value);
}
const isArray = (value) => {
    return Array.isArray(value);
}

const isDate = (value) => {
    return value instanceof Date;
}

const isBlob = (value, isReactNative) => {
    return isReactNative
        ? isObject(value) && !_.isUndefined(value.uri)
        : isObject(value) &&
        typeof value.size === 'number' &&
        typeof value.type === 'string' &&
        typeof value.slice === 'function';
}

const isFile = (value, isReactNative) => {
    return (
        isBlob(value, isReactNative) &&
        typeof value.name === 'string' &&
        (isObject(value.lastModifiedDate) || typeof value.lastModified === 'number')
    );
}

const initCfg = (value) => {
    return _.isUndefined(value) ? false : value;
}

const serialize = (obj, cfg, fd, pre) => {
    cfg = cfg || {};
    fd = fd || new FormData();

    cfg.indices = initCfg(cfg.indices);
    cfg.nullsAsUndefineds = initCfg(cfg.nullsAsUndefineds);
    cfg.booleansAsIntegers = initCfg(cfg.booleansAsIntegers);
    cfg.allowEmptyArrays = initCfg(cfg.allowEmptyArrays);
    cfg.noFilesWithArrayNotation = initCfg(cfg.noFilesWithArrayNotation);
    cfg.dotsForObjectNotation = initCfg(cfg.dotsForObjectNotation);

    const isReactNative = typeof fd.getParts === 'function';

    if (_.isUndefined(obj)) {
        return fd;
    } else if (_.isNull(obj)) {
        if (!cfg.nullsAsUndefineds) {
            fd.append(pre, '');
        }
    } else if (_.isBoolean(obj)) {
        if (cfg.booleansAsIntegers) {
            fd.append(pre, obj ? 1 : 0);
        } else {
            fd.append(pre, obj);
        }
    } else if (isArray(obj)) {
        if (obj.length) {
            obj.forEach((value, index) => {
                let key = pre + '[' + (cfg.indices ? index : '') + ']';

                if (cfg.noFilesWithArrayNotation && isFile(value, isReactNative)) {
                    key = pre;
                }

                serialize(value, cfg, fd, key);
            });
        } else if (cfg.allowEmptyArrays) {
            fd.append(pre + '[]', '');
        }
    } else if (isDate(obj)) {
        fd.append(pre, obj.toISOString());
    } else if (isObject(obj) && !isBlob(obj, isReactNative)) {
        Object.keys(obj).forEach((prop) => {
            const value = obj[prop];

            if (isArray(value)) {
                while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
                    prop = prop.substring(0, prop.length - 2);
                }
            }

            const key = pre
                ? cfg.dotsForObjectNotation
                    ? pre + '.' + prop
                    : pre + '[' + prop + ']'
                : prop;

            serialize(value, cfg, fd, key);
        });
    } else {
        fd.append(pre, obj);
    }

    return fd;
};

export {
    serialize,
    isArray,
    isObject
}