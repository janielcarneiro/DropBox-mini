var express = require('express');
var router = express.Router();
//formidable = para poder enviar arquivos tipo foto,video etc;
var formidable = require('formidable');
//mexe com os sistema de arquivo
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/file', (req,res)=>{

  let path = './' + req.query.path;

  if(fs.existsSync(path)){
    //ler o conteudo do arquivo
    fs.readFile(path, (err, data)=>{

      if(err){
        console.error(err);
        res.status(400).json({
            error : err
        });

      }else{
        res.status(200).end(data);
      }

    })
  }else{

    res.status(200).json({
      error : 'arquivo não existente'
    });

  }

})

router.delete('/file', (req,res)=>{
 

  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true

  });
  form.parse(req,(err, fields, files)=>{

   
  let path = './' + fields.path

  if(fs.existsSync(path)){

    fs.unlink(path, err=>{

      if(err){

        res.status(400).json({
          err
        });

      }else{
        res.json({
          fields : fields
        });
    
      }

    });

  }else{

    res.status(200).json({
      error : 'arquivo não existente'
    });

  }

  });

});

router.post('/upload', function(req,res){

  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true

  });

  form.parse(req,(err, fields, files)=>{

    res.json({
      files : files
    });

  });


});

module.exports = router;
