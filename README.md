Структура проекта
-----------------

Все приложения в Django располагаются в каталоге /apps/. Каждое 
приложение содержит файлы views.py, models.py и urls.py. Также приложение 
может содержать каталог /templates/ с шаблонами приложения и /static/ с 
файлами скриптов, стилей и т. д.

    project/
    -- apps/
    -- -- app/
    -- -- -- views.py
    -- -- -- models.py
    -- -- -- urls.py
    -- -- templates/
    -- -- -- app/
    -- -- -- -- index.html
    -- -- static/
    -- -- -- js/
    -- -- -- css/
    -- assets/
    -- -- components/
    -- -- css/
    -- -- -- vendor/
    -- -- fonts/
    -- -- handlebars/
    -- -- img/
    -- -- js/
    -- -- -- vendor/
    -- -- scss/
    -- -- app.css
    -- -- app.js
    -- -- bower.css
    -- -- bower.js
    -- config/
    -- -- settings/
    -- -- -- common/
    -- -- -- -- static.py
    -- -- -- -- templates.py
    -- -- -- local.py
    -- -- -- production.py
    -- -- urls.py
    -- media/
    -- templates/
    -- -- app/
    -- -- -- index.html
    -- -- base.html
    -- -- handlebars/
    -- node_modules/
    -- .csslintrc
    -- .eslintrc
    -- .jscsrc
    -- bower.json
    -- Gruntfile.js
    -- install.sh
    -- package.json


Конфигурационные файлы
----------------------

    project/
    -- apps/
    -- -- app/
    -- -- -- urls.py
    -- config/
    -- -- settings/
    -- -- -- common/
    -- -- -- -- static.py
    -- -- -- -- templates.py
    -- -- urls.py

Ссылки и привязка к Представлениям определяются в файлах urls.py. 
Корневой файл находится в каталоге config/ проекта и определяет в себе 
некторые адреса и правила их обработки.

url(r'^admin/', admin.site.urls),
url(r'^login/$', login, name='login')

Также в этот файл могут подключаться файлы конфигурации URL приложений из 
модуля приложений, соответственно.

url(r'^', include('apps.app.urls'))

Настройки статики находятся в файле config/settings/common/static.py 
проекта.

Определение адресов для статики:

STATIC_URL = '/static/'

Определение путей до статики на сервере:

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "assets"),
)

В STATIC_ROOT собираются файлы из определённых в STATICFILES_DIRS мест и 
каталогов /static/ приложений (apps/app/static/) Вся статика проекта 
хранится в каталоге assets/ в корне проекта. Сбор в static/ 
осуществляется специальной командой: manage.py collectstatic.


Grunt: сбор файлов статики, обработка.
--------------------------------------

Для управления задачами по подготовке и сборке компонентов проекта 
используется менеджер задач Grunt.

- Управление сторонними компонентами
- Запуск линтеров для JS, CSS, SCSS
- Компиляция SCSS
- Компиляция Handlebars
- Объединение и минификация файлов стилей и скриптов

    project/
    -- assets/
    -- -- components/
    -- -- css/
    -- -- -- client.css
    -- -- fonts/
    -- -- handlebars/
    -- -- img/
    -- -- js/
    -- -- scss/
    -- -- -- base.scss
    -- -- app.css
    -- -- app.js
    -- -- bower.css
    -- -- bower.js
    -- templates/
    -- -- handlebars/
    -- node_modules/
    -- .csslintrc
    -- .eslintrc
    -- .jscsrc
    -- bower.json
    -- Gruntfile.js
    -- install.sh
    -- package.json

Устанавливаемые компоненты (jQuery, bootstrap и т. д.) определены в 
секции "dependencies" файла bower.json. Всё устанавливается в каталог 
assets/components.

Установка и удаление дополнительных компонентов:

$ grunt bowerinstall:package_name#version
$ grunt boweruninstall:package_name

Сборка: компиляция SCSS, конкатенация CSS и JS, минификация 
производятся командой:

$ grunt build

После запуска происходит следующее:

1. bower_concat: из файлов и скриптов установленных компонентов производятся 
два файла, assets/bower.css и assets/bower.js соответственно.

2. sass: запускается SASS-компилятор, из assets/scss/base.scss производится 
assets/css/client.css.

3. concat: объединяются файлы стилей и скрипты проекта, всё (исключая 
содержимое подкаталогов vendor) из assets/css и assets/js объединяется в 
assets/app.css и assets/app.js соответственно.

4. uglify: производятся минифицированные версии файлов assets/bower.js и 
assets/app.js.

5. cssmin: производятся минифицированные версии файлов assets/bower.css и 
assets/app.css

6. shell:handlebars: производится файл assets/handlebars/templates.js из 
шаблонов в templates/handlebars


Grunt: конфигурация
-------------------

.csslintrc, .jscsrc, eslintrc -- настройки линтеров.

bower.json -- настройка управления компонентами проекта, здесь в секции 
"dependencies" актуальный список установленных через bowerinstall компонентов.

package.json -- модули для Grunt. Компиляторы, сборщики, минификаторы и прочие 
компоненты, необходимые для выполнения описанных выше задач.

Gruntfile.js -- главный конфигурационный файл с описанием задач, настроек и 
регистрацией команд типа grunt build, grunt bowerinstall.


Grunt: запуск проверки
----------------------

Запуск проверки производится командой:

$ grunt

Поочерёдно будут запущены проверки синтаксиса и соответствия стандартам 
для CSS и JS файлов.


Grunt: автоматизация
--------------------

$ grunt watch

Производится запуск проверки и последующей сборки статики для проекта. После 
задача находится в режиме ожидания и после внесения в файлы изменений 
-- автоматически запускается проверка и сбор.
