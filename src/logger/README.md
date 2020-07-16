# Logger

Current version: 1.0.0

## Winston logger

### Dependencies

```bash
npm i winston
```

### methods

#### create

Tạo một instance

**Arguments**

- `options`: Object
    - `level`: Sử dụng để cấu hình mức đố ghi log. Default `info`
    - `transportsToConsole`: Cờ logger ghi log vào console. Default `true`
    - `showLevel`: Cờ logger hiển thị level của log. Default `true`
    - `showTime`: Cờ logger hiển thị thời gian ghi log, thời gian theo định dạng UTC. Defaul `true` 

### Guideline

```js
const Logger = require('path/to/logger/winston_logger')
const logger = Logger.create()

logger.info('info')
logger.info('info', meta)
logger.info(object)

logger.warn('warn')
logger.warn('warn', meta)
logger.warn(object)

logger.error('error')
logger.error('error', meta)
logger.error(object)
```
