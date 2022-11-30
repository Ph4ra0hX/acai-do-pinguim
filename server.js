var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get(
  "/enviarpedido/:pedido/:endereco/:pagamento/:observacoes/:total/:queroentrega",
  function (req, res) {
    var pedido;
    var endereco;
    var queroentrega;
    var pagamento;
    var observacoes;
    var total;

    var pedidoCompleto = "";

    pedido = JSON.parse(req.params.pedido);
    endereco = JSON.parse(req.params.endereco);
    pagamento = JSON.parse(req.params.pagamento);
    observacoes = JSON.parse(req.params.observacoes);
    total = JSON.parse(req.params.total);
    queroentrega = JSON.parse(req.params.queroentrega);

    //console.log(pedido[0].Peso);

    // console.log(pedido[0].Acai);

    //console.log(pedido[0].Guloseimas);

    // console.log(pedido[0].Frutas);

    // console.log(pedido[0].Cobertura);

    console.log(pedido);

    async function gerarPedido() {
      for (var x = 0; x < pedido.length; x++) {
        if (pedido[x].Peso.id == 1) {
          pedidoCompleto += `\n\n🍨 *AÇAÍ:*\n`;

          pedidoCompleto += `\n   • ${pedido[x].Acai.nome}\n`;

          pedidoCompleto += `\n   • ${pedido[x].Peso.nome}\n`;

          if (pedido[x].Guloseimas.length > 0) {
            pedidoCompleto += `\n🍭 *GULOSEIMAS:*\n`;

            for (var i = 0; i < pedido[x].Guloseimas.length; i++) {
              console.log(pedido[x].Guloseimas[i].nome);
              pedidoCompleto += `\n   • ${pedido[x].Guloseimas[i].nome}\n`;
            }
          }

          if (pedido[x].Frutas.length > 0) {
            pedidoCompleto += `\n🥝 *FRUTAS:*\n`;

            for (var i = 0; i < pedido[x].Frutas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Frutas[i].nome}\n`;
            }
          }

          if (pedido[x].Caldas.length > 0) {
            pedidoCompleto += `\n🍫 *CALDAS:*\n`;

            for (var i = 0; i < pedido[x].Caldas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Caldas[i].nome}\n`;
            }
          }

          if (pedido[x].Cobertura.length > 0) {
            pedidoCompleto += `\n🍬 *COBERTURA:*\n`;

            for (var i = 0; i < pedido[x].Cobertura.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Cobertura[i].nome}\n`;
            }
          }

          if (pedido[x].Cremes.length > 0) {
            pedidoCompleto += `\n🍫 *CREMES:*\n`;

            for (var i = 0; i < pedido[x].Cremes.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Cremes[i].nome}\n`;
            }
          }
        }

        if (pedido[x].Peso.id == 8) {
          pedidoCompleto += `\n\n----------------------\n`;

          pedidoCompleto += `\n\n🍨 *SORVETE:*\n`;

          if (pedido[x].Acai.length > 0) {
            console.log("entrou");
            for (var i = 0; i < pedido[x].Acai.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Acai[i].nome}\n`;
            }
          }

          pedidoCompleto += `\n   • ${pedido[x].Peso.nome}\n`;

          if (pedido[x].Guloseimas.length > 0) {
            pedidoCompleto += `\n🍭 *GULOSEIMAS:*\n`;

            for (var i = 0; i < pedido[x].Guloseimas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Guloseimas[i].nome}\n`;
            }
          }

          if (pedido[x].Frutas.length > 0) {
            pedidoCompleto += `\n🥝 *FRUTAS:*\n`;

            for (var i = 0; i < pedido[x].Frutas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Frutas[i].nome}\n`;
            }
          }

          if (pedido[x].Caldas.length > 0) {
            pedidoCompleto += `\n🍫 *CALDAS:*\n`;

            for (var i = 0; i < pedido[x].Caldas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Caldas[i].nome}\n`;
            }
          }

          if (pedido[x].Cobertura.length > 0) {
            pedidoCompleto += `\n🍬 *COBERTURA:*\n`;

            for (var i = 0; i < pedido[x].Cobertura.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Cobertura[i].nome}\n`;
            }
          }

          if (pedido[x].Cremes.length > 0) {
            pedidoCompleto += `\n🍫 *CREMES:*\n`;

            for (var i = 0; i < pedido[x].Cremes.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Cremes[i].nome}\n`;
            }
          }
        }

        if (pedido[x].Peso.id == 9) {
          pedidoCompleto += `\n\n----------------------\n`;
          pedidoCompleto += `\n\n🍨 *MILKSHAKE:*\n`;

          pedidoCompleto += `\n   • ${pedido[x].Acai.nome}\n`;

          pedidoCompleto += `\n   • ${pedido[x].Peso.nome}\n`;

          if (pedido[x].Guloseimas.length > 0) {
            pedidoCompleto += `\n🍭 *GULOSEIMAS:*\n`;

            for (var i = 0; i < pedido[x].Guloseimas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Guloseimas[i].nome}\n`;
            }
          }

          if (pedido[x].Cobertura.length > 0) {
            pedidoCompleto += `\n🍬 *COBERTURA:*\n`;

            for (var i = 0; i < pedido[x].Cobertura.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Cobertura[i].nome}\n`;
            }
          }
        }

        if (pedido[x].Peso.id == 10) {
          pedidoCompleto += `\n\n----------------------\n`;
          pedidoCompleto += `\n\n🍨 *VITAMINA DE AÇAÍ:*\n`;

          pedidoCompleto += `\n   • ${pedido[x].Acai.nome}\n`;

          pedidoCompleto += `\n   • ${pedido[x].Peso.nome}\n`;

          if (pedido[x].Guloseimas.length > 0) {
            pedidoCompleto += `\n🍭 *GULOSEIMAS:*\n`;

            for (var i = 0; i < pedido[x].Guloseimas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Guloseimas[i].nome}\n`;
            }
          }

          if (pedido[x].Frutas.length > 0) {
            pedidoCompleto += `\n🥝 *FRUTAS:*\n`;

            for (var i = 0; i < pedido[x].Frutas.length; i++) {
              pedidoCompleto += `\n   • ${pedido[x].Frutas[i].nome}\n`;
            }
          }
        }

        if (x == pedido.length) {
          return pedidoCompleto;
        }
      }

      pedidoCompleto += `\n------------------\n`;

      if (queroentrega == true) {
        pedidoCompleto += `\n  Nome:  \n`;
        pedidoCompleto += `\n   • ${endereco.nome} \n`;

        pedidoCompleto += `\n  Rua:  \n`;
        pedidoCompleto += `\n   • ${endereco.rua} \n`;

        pedidoCompleto += `\n  Bairro:  \n`;
        pedidoCompleto += `\n   • ${endereco.bairro} \n`;

        pedidoCompleto += `\n  Número:  \n`;
        pedidoCompleto += `\n   • ${endereco.numero} \n`;

        pedidoCompleto += `\n  Ponto de Referência:  \n`;
        pedidoCompleto += `\n   • ${endereco.pontoderef} \n`;
      } else {
        pedidoCompleto += `\n  Nome:  \n`;
        pedidoCompleto += `\n   • ${endereco.nome2} \n`;
      }

      pedidoCompleto += `\n------------------\n`;

      pedidoCompleto += `\n  Pagamento: ${pagamento}\n`;

      if (total >= 15 && queroentrega == true) {
        pedidoCompleto += `\n  Entrega Grátis\n`;
      }

      if (total < 15 && queroentrega == true) {
        pedidoCompleto += `\n Entrega 1 Real\n`;
        total += 1;
      }

      pedidoCompleto += `\n  *Total: ${total.toFixed(2)}*\n`;

      pedidoCompleto += `\n------------------\n`;

      pedidoCompleto += `\n  Observação: ${observacoes}\n`;

      console.log(pedidoCompleto);
    }

    gerarPedido().then(() => {
      res.redirect(
        "https://api.whatsapp.com/send?1=pt_BR&phone=5588996320889&text=" +
          pedidoCompleto
      );
    });
  }
);
//.listen(process.env.PORT);
app.listen(5000);
