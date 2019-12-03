var multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let path = './public/arquivos/'
        cb(null,path)
    },
    filename: function(req,file,cb){
        let arquivo = Date.now()+"-"+file.originalname
        cb(null,arquivo)
    }
})

const upload = multer({storage})

module.exports = upload