import * as pdfMake from 'pdfmake/build/pdfmake';


/**
 * Build and download a pdf from content state
 * @param contentState Content state of the editor.
 * @param name Name od the file to be downloaded
 */
export default function pdfDownload(contentState, name): void {

    const output = { content: [], defaultStyle: { font: 'Roboto' } };

    for (const block of contentState.getBlockMap().toArray()) {
        processBlock(block, contentState, output);
    }

    // TODO: maybe find a more reliable link to these
    const fonts = {
        Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
    };

    // Create the pdf from output and download it
    pdfMake.createPdf(output, null, fonts).download(name);
}

// Take an individual content block, parse it, style it and add it to the output
function processBlock(block, contentState, output): void {

    const defaultHeaderStyle = { bold: true, margin: [0, 5, 0, 0] };

    if (block.getType() === 'header-two') {

        output.content.push(
            {
                text: block.getText(), fontSize: 20, ...defaultHeaderStyle
            }
        );
    } else if (block.getType() === 'header-three') {

        output.content.push(
            {
                text: block.getText(), fontSize: 15, ...defaultHeaderStyle
            }
        );
    } else if (block.getType() === 'unordered-list-item') {

        output.content.push(
            {
                ul: [
                    { text: block.getText(), fontSize: 11 }
                ]
            }
        );
    } else if (block.getType() === 'unstyled') {

        output.content.push(
            {
                text: block.getText(), fontSize: 11
            }
        );
    } else if (block.getType() === 'atomic' || block.getType() === 'img') {
        console.log('image');
        

        try {
            const data = contentState.getEntity(block.getEntityAt(0)).getData().src.toString();
            const s = new Image();
            s.src = data;
            // output.content.push(
            //     {
            //         image: data, width: s.width, height: s.height
            //     }
            // );
        } catch (e) {
            console.log(`Image saving might have gone bad\n ${e.message}`);

        }
    }
}