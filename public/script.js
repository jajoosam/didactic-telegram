      var autolinker = new Autolinker( {
          urls : {
              schemeMatches : true,
              wwwMatches    : true,
              tldMatches    : true
          },
          email       : true,
          phone       : true,
          mention     : 'twitter',
          hashtag     : 'twitter',

          stripPrefix : true,
          stripTrailingSlash : true,
          newWindow   : true,

          truncate : {
              length   : 0,
              location : 'end'
          },

          className : ''
      });
if(window.location.hash == "#custom"){
  document.getElementById("lol").style.display = "block";
}

var bin = {};
var id;
function read(){
  $.ajax({
  url: 'https://api.jsonbin.io/b/5ac60ff3656b6e0b857c59fe/latest',
  type: 'GET',
  success: (data) => {
    console.log(data);
    bin = data;
    console.log("binified!")
  },
  error: (err) => {
    console.log(err.responseJSON);
  }
});
}
read();
function update(m){
  $.ajax({
    url: 'https://api.jsonbin.io/b/5ac60ff3656b6e0b857c59fe',
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(bin),
    success: (data) => {
      console.log("updated!");
                  swal({
              title: "✔️ Done" ,
              text: "Your linkr has been generated!",
              content: {
                element: "a",
                attributes: {
                  href: "https://linkr.fun/"+m+"#"+id,
                  text: 'Find it here!' 
                },

              },
              button: false
            });
    },
    error: (err) => {
      console.log(err.responseJSON);
    }
  });
}

$("#foorm").submit(function(e) {
  e.preventDefault();
  document.getElementById("container").style.display="none";
     document.getElementById("hid").style.display="block";
  document.getElementById("hid").innerHTML="<div class='spinner'></div><br><h1>🚧 Loading<br>This will take around 15 seconds ⏲️</h1>"
  console.log("ya");
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impham9vc2FtQGdtYWlsLmNvbSIsImlhdCI6MTUwODQ0MDUzNCwiZXhwIjoxNTM5OTc2NTM0fQ.f1ilbv8gGxHMZht6yr-yz-83_rlZfweVUCrwcHPYYCje4be1L3Oumf7b_g470UESVsKYdoOMGooWIJ0iWCFN-07KyqF9AWxd68fcXuN0EIg9tx1IazN-dQBnuAZ9i5V4r_nYXwKFaiC2GBjl_ODKba6cQFMm943HJISeyw708LgDMdwzJvQClZ9Bn9FQs0cEq3CQyFTzj67b8qaslmKSa3UA5f-FGrfPzoq2rSsslv3xu5Uu4wI0LL5oI27PmB8suXeVPvj5k_IUhtN6FKo1T8QkasTumw8ctqZVG9c4YAJ6EH9m0F1lfWpP6-jzJy92bbFSYQnbcbiEoXykMmHFjW3MOgWol3QTrO6or2lwSqPC47GUVIQ-N1LzWy1w4HLDcOGK64bIb7MZGML_59OUq4mhhj0yrJ8Y-XHWuIkiomg0s9JSBx2NIk_QVRXrR4bDWqMohF7S0_Z543V38eTm12FJ-MzyI9swHM6PrSR3qFfAmyp-urjcLM3KeqxvSSB_ofV5XjekPwSEuTv3-b3l8O7eH7ml_qk2edTJbnXXWmKV8Vtyn3LGo7jGeZ6o3vIGOG9Y55RwHTZny6OZ32PRmdEFbfb2P-62Zx_YFklCL3KmHrVNZNgE5v83RjQg47fubqgRcKuU04RMtfqr4OjQTeDJsHI85aQfMv-HuOtFeow";
    const url = document.getElementById("link").value;  
  
    $.getJSON(`https://page.rest/fetch?token=${token}&url=${url}&header=X-Frame-Options&embed=1`, function(data){
      console.log(data);
      if(document.getElementById("id").value != "" && !bin.hasOwnProperty(document.getElementById("id").value)){
        id = document.getElementById("id").value;
      }
      
      else{
        id = Math.random().toString(32).substring(2, 5) + Math.random().toString(36).substring(2, 5);
      }
      bin[id] ={};

      bin[id]["text"] = "<style>.dark a{text-decoration:none; color:#002b36}</style>" + autolinker.link(document.getElementById("text").value);
      bin[id]["count"] = 0;
    if(document.getElementById("article").checked){
      $.ajax({
        url: 'https://mercury.postlight.com/parser?url='+url,
        headers: { //Required only if you are trying to access a private bin
          'x-api-key': "nV8GLjA7MqquuhSJZiusmbEKoMO3cSEhmVJcqfpH"
        },
        success: (dat) => {
          bin[id]["code"]= "<h1>"+dat.title+"</h1><h3>"+Math.round(parseInt(dat.word_count)/220)+" min ("+dat.word_count+" words)</h3>" + dat.content;
          bin[id]["user"]= document.getElementById("userr").value;
          bin[id]["type"] = "readify";
          bin[id]["url"] = url;
          update("r");
        },
        error: (err) => {
          console.log(err.responseJSON);
        }
      });
    }
     else if(typeof data.embed=="string"){
        bin[id]["type"] = "embed";
          bin[id]["user"]= document.getElementById("userr").value;

        bin[id]["code"]= data.embed;
        bin[id]["url"] = url;
        update("o");
      }

       else if(data.headers["X-Frame-Options"] != "deny" && data.headers["X-Frame-Options"] != "sameorigin"){
        bin[id]["type"] = "iframe";
          bin[id]["user"]= document.getElementById("userr").value;
        bin[id]["code"]= "<iframe id='frame' style='margin: 0; border: none; width: 100%;' src='"+url+"'></iframe>";
        bin[id]["url"] = url;
        update("f");
       }
      else{
        swal("We're not able to get this link 😕 Try again after a few weeks.")
      }
});
});
var du = 0;
function preview(){
  
        document.getElementById("use").innerHTML = "@" + document.getElementById("userr").value;
        document.getElementById("user").src = "https://avatars.io/twitter/" + document.getElementById("userr").value;
        document.getElementById("fit").innerHTML =   '<div style="margin:1em;">'+"<style>.dark a{text-decoration:none; color:#002b36}</style>" + autolinker.link(document.getElementById("text").value)+'</div>';
                document.getElementById("lio").href= "https://twitter.com/" + document.getElementById("userr").value;
  document.getElementById("z").style.display = "block";
  du = 1;
}

function br(){
  if(du){
    preview();
  }
}
preview();