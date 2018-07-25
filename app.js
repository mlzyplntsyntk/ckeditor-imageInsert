import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import View from '@ckeditor/ckeditor5-ui/src/view';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class SampleView extends View {
    constructor( locale ) {
        super( locale );

        const bind = this.bindTemplate;

        // Views define their interface (state) using observable attributes.
        this.set( 'elementClass', 'bar' );

        this.setTemplate( {
            tag: 'input',

            attributes: {
                type: [
                    'file'
                ]
            },
            on: {
                // Views listen to DOM events and propagate them.
                click: bind.to( 'clicked' ),
                change: bind.to('changed')
            }
        } );
    }
}

class InsertImage extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertImage', locale => {
            const view = new SampleView( locale );

            console.log(view);

            // Callback executed once the image is clicked.
            view.on("changed", (e)=>{

              if (view.element.files && view.element.files[0]) {

                var FR= new FileReader();

                FR.addEventListener("load", function(e) {

                  editor.model.change( writer => {
                      const imageElement = writer.createElement( 'image', {
                          src: e.target.result
                      } );

                      // Insert the image in the current selection location.
                      editor.model.insertContent( imageElement, editor.model.document.selection );
                  } );

                });

                FR.readAsDataURL( view.element.files[0] );
              }

            });
            view.on( 'clickedsss', () => {
                const imageURL = prompt( 'Image URL' );
                editor.model.change( writer => {
                    const imageElement = writer.createElement( 'image', {
                        src: imageUrl
                    } );

                    // Insert the image in the current selection location.
                    editor.model.insertContent( imageElement, editor.model.document.selection );
                } );
            } );

            return view;
        } );
    }
}

export default class ClassicEditor extends ClassicEditorBase {}
ClassicEditor.build = {
    plugins: [
        Essentials, Paragraph, Bold, Italic, Image, InsertImage, ImageCaption
    ],
    config: {
        toolbar: {
            items: [
                'bold', 'italic', 'insertImage'
            ]
        }
    }
};
window.ClassicEditor = ClassicEditor;
