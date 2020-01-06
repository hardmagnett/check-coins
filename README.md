# check-coins

Высоконагруженная таблица.  
  
Может содержать около 2000 записей.  
Записи подгружаются по скролу из стороннего API.  
Обновления данных приходят по нативным веб-сокетам.  
Данные о новом курсе валют могу приходить до 100 раз в секунду.  
Данные о сделках могут приходить до 1000 раз в секунду.  
  
В коде выполнен ряд оптимизаций, чтобы уменьшить нагрузку на CPU и RAM.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
