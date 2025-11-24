import type { Template } from '@pdfme/common';
import { text, line, rectangle } from '@pdfme/schemas';

export const template: Template = {
    "schemas":[[
        {
            "name":"V_Type",
            "type":"text","content":"","position":{"x":51.27,"y":75},"width":37.57,"height":7.14,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":true,"required":false,"readOnly":false
        },{
            "name":"name",
            "type":"text","content":"","position":{"x":36.13,"y":90},"width":160.07,"height":7.14,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"date",
            "type":"text","content":"","position":{"x":36.07,"y":98},"width":37.57,"height":7.14,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"myntCard",
            "type":"text","content":"","position":{"x":27.02,"y":120},"width":54.77,"height":7.14,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"bankName",
            "type":"text","content":"","position":{"x":105.01,"y":120},"width":92.87,"height":7.14,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"clearing",
            "type":"text","content":"","position":{"x":92,"y":135},"width":18.26,"height":7.14,"rotate":0,"alignment":"center","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"bankNum",
            "type":"text","content":"","position":{"x":115,"y":135},"width":72.5,"height":7.14,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"purchaseDate",
            "type":"text","content":"","position":{"x":42,"y":150},"width":28,"height":7.14,"rotate":0,"alignment":"center","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"ammount",
            "type":"text","content":"","position":{"x":42,"y":160},"width":20,"height":7.14,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"numReceipts",
            "type":"text","content":"","position":{"x":101.89,"y":149.55},"width":27.52,"height":7.14,"rotate":0,"alignment":"center","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"budgetManager",
            "type":"text","content":"","position":{"x":160,"y":148},"width":38,"height":7.14,"rotate":0,"alignment":"center","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"projectNum",
            "type":"text","content":"","position":{"x":160,"y":157},"width":38,"height":7.14,"rotate":0,"alignment":"center","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        },{
            "name":"descrition",
            "type":"text","content":"","position":{"x":14.68,"y":175.05},"width":113.51,"height":97.37,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":false
        }
        ,
        {"name":"field1","type":"text","content":"Auto created by DVS","position":{"x":10.02,"y":21.06},"width":189.97,"height":6.09,"rotate":0,"alignment":"center","verticalAlignment":"top","fontSize":16,"lineHeight":1,"characterSpacing":2,"fontColor":"#000000","fontName":"code","backgroundColor":"","opacity":1,"strikethrough":false,"underline":true,"required":false,"readOnly":true},
        {"name":"field4","type":"text","content":"DVS (Digitala Verifikat System) creates supporting documents for receipts. It was originally created for Kongliga Flygsektionen THS.\n\nMore information about DVS can be found at github.com/VikHolger/DVS","position":{"x":11.32,"y":28.46},"width":187.59,"height":19.84,"rotate":0,"alignment":"center","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","fontName":"code","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},

        {"name":"field5","type":"text","content":"Kongliga Flygsektionen","position":{"x":17.15,"y":56.25},"width":150,"height":10.05,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":22,"lineHeight":1,"characterSpacing":0,"fontColor":"#0056b6","fontName":"rale_title","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        
        {"name":"field6","type":"text","content":"Verifikatstyp:","position":{"x":20.06,"y":75},"width":35.19,"height":7.41,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7","type":"text","content":"Namn:","position":{"x":19,"y":90},"width":16,"height":5.82,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy","type":"text","content":"Ifyllt:","position":{"x":19,"y":98},"width":16,"height":5.82,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 2","type":"text","content":"Mynt","position":{"x":48.05,"y":111.04},"width":13.23,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":true,"required":false,"readOnly":true},
        {"name":"field7 copy 3","type":"text","content":"Personlig","position":{"x":136.37,"y":110.19},"width":21.43,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":true,"required":false,"readOnly":true},
        {"name":"field7 copy 4","type":"text","content":"Kort:","position":{"x":15.18,"y":120},"width":13.23,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 5","type":"text","content":"Bank:","position":{"x":92.12,"y":120},"width":13.23,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 6","type":"text","content":"Clearing","position":{"x":92,"y":128},"width":19.31,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 7","type":"text","content":"Kontonummer","position":{"x":115,"y":128},"width":52.92,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 8","type":"text","content":"Affärsdatum:","position":{"x":11,"y":150},"width":30,"height":5.82,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 9","type":"text","content":"Antal Kvitton:","position":{"x":73,"y":150},"width":30,"height":5.82,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 12","type":"text","content":"Belopp:","position":{"x":11,"y":160},"width":30,"height":5.82,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 15","type":"text","content":"kr","position":{"x":63,"y":160},"width":30,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 10","type":"text","content":"Ansvarspost:","position":{"x":130,"y":148},"width":30,"height":5.82,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 11","type":"text","content":"Projekt:","position":{"x":130,"y":157},"width":30,"height":5.82,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field7 copy 13","type":"text","content":"Beskrivning:","position":{"x":14.66,"y":168.13},"width":30,"height":5.82,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":13,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        
        {"name":"field39","type":"text","content":"CASH: cash@t.kth.se\nKBM: kbm@t.kth.se\nEKO: eko-mottagningen@t.kth.se","position":{"x":134.08,"y":174.52},"width":63.5,"height":14.02,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":11,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field39 copy","type":"text","content":"Kontaktuppgifter:","position":{"x":133.76,"y":169.45},"width":63.5,"height":5.29,"rotate":0,"alignment":"right","verticalAlignment":"top","fontSize":12,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":true,"required":false,"readOnly":true},
        {"name":"field39 copy 2","type":"text","content":"THS, Flygsektionen\nDrottning Kristinas väg 29\n114 29, Stockholm\n802430-2559","position":{"x":133,"y":256.62},"width":64,"height":17.99,"rotate":0,"alignment":"left","verticalAlignment":"top","fontSize":11,"lineHeight":1,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        {"name":"field39 copy 3","type":"text","content":"Kvitto(n) bifogas tillsammans med denna verifikation till en av mejladresserna ovanför, beroende på vad verifikationen behandlar. \n\nPapperskvitton scannas in\noch bifogas!\n\nHar du frågor kring verifikatet, fråga Cash, KBM eller Eko Pheus.","position":{"x":133,"y":192},"width":64,"height":62.5,"rotate":0,"alignment":"left","verticalAlignment":"middle","fontSize":10,"lineHeight":1.2,"characterSpacing":0,"fontColor":"#000000","backgroundColor":"","opacity":1,"strikethrough":false,"underline":false,"required":false,"readOnly":true},
        
        {"name":"field15","type":"line","position":{"x":10,"y":69},"width":190,"height":0.75,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field15 copy","type":"line","position":{"x":10,"y":85.65},"width":190,"height":0.75,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field15 copy 2","type":"line","position":{"x":10,"y":107},"width":190,"height":0.75,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field15 copy 3","type":"line","position":{"x":10,"y":144},"width":190,"height":0.75,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},

        {"name":"field_dash 1","type":"line","position":{"x":87.5,"y":107},"width":0.25,"height":3,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field_dash 2","type":"line","position":{"x":87.5,"y":112},"width":0.25,"height":3,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field_dash 3","type":"line","position":{"x":87.5,"y":117},"width":0.25,"height":3,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field_dash 4","type":"line","position":{"x":87.5,"y":122},"width":0.25,"height":3,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field_dash 5","type":"line","position":{"x":87.5,"y":127},"width":0.25,"height":3,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field_dash 6","type":"line","position":{"x":87.5,"y":132},"width":0.25,"height":3,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field_dash 7","type":"line","position":{"x":87.5,"y":137},"width":0.25,"height":3,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field_dash 8","type":"line","position":{"x":87.5,"y":142},"width":0.25,"height":2.5,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        
        {"name":"field37","type":"line","position":{"x":130,"y":167},"width":70,"height":0.5,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field37 copy 2","type":"line","position":{"x":130,"y":254},"width":70,"height":0.5,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        {"name":"field37 copy","type":"line","position":{"x":130,"y":192},"width":70,"height":0.5,"rotate":0,"opacity":1,"readOnly":true,"color":"#000000","required":false,"content":""},
        
        {"name":"field38","type":"rectangle","position":{"x":130,"y":144},"width":70,"height":133,"rotate":0,"opacity":1,"borderWidth":1,"borderColor":"#000000","color":"","readOnly":true,"radius":0,"required":false,"content":""},
        {"name":"field45","type":"rectangle","position":{"x":10,"y":52},"width":190,"height":225,"rotate":0,"opacity":1,"borderWidth":1,"borderColor":"#000000","color":"","readOnly":true,"radius":0,"required":false,"content":""},
        {"name":"field2","type":"rectangle","position":{"x":10,"y":20},"width":190,"height":30,"rotate":0,"opacity":1,"borderWidth":1,"borderColor":"#000000","color":"","readOnly":true,"radius":0,"required":false,"content":""}
    ]],
    
    "basePdf":{"width":210,"height":297,"padding":[20,10,20,10]},"pdfmeVersion":"5.5.1"
}