fx_version 'cerulean'

game 'gta5'

name 'phone'

client_scripts {
    'dist/client/*.js'
}
server_script {
    'dist/server/*.js'
}

ui_page 'dist/web/index.html'
file 'dist/web/index.html'
files {
    'config.json',
    'dist/web/index.html',
    'dist/web/**/*',
}