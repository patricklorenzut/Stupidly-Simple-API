var chatbubble = function () {    

    var settings, base_url, outside_frame_css, inside_frame_css, chat_image, button_frame_wrapper, box_frame_wrapper, button_frame, box_frame
    
    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    }

    function toggle_box(){
        console.log('toggle box')
        if(isHidden(box_frame_wrapper)){
            console.log('make visible')
            box_frame_wrapper.style.display = 'block'
        }else{            
            console.log('make hidden')
            box_frame_wrapper.style.display = 'none'
        }

    }

    function setup_button_frame(){
        //frame wrapper
        button_frame_wrapper = document.createElement("div")
        button_frame_wrapper.setAttribute('id', 'ssa-chat-bubble-button-frame-wrapper')
        button_frame_wrapper.classList.add('ssa-chat-bubble-frame-wrapper')
        document.body.appendChild(button_frame_wrapper)
            
        //inner
        button_frame = document.createElement('iframe');
        button_frame.setAttribute('id','ssa-chat-bubble-button-frame')
        button_frame.setAttribute('scrolling','no')
        var html = '<head><link rel="stylesheet" href="' + inside_frame_css + '" type="text/css"/><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="ssa-chat-bubble-wrapper" style="display:none;"><div id="ssa-chat-bubble-button"><img src="' + chat_image + '"/><div class="close"></div></div></div></body>';
        button_frame_wrapper.appendChild(button_frame);
        button_frame.contentWindow.document.open();
        button_frame.contentWindow.document.write(html);
        button_frame.contentWindow.document.close(); 
    }

    function setup_box_frame(){
        //frame wrapper
        box_frame_wrapper = document.createElement("div")
        box_frame_wrapper.setAttribute('id', 'ssa-chat-bubble-chat-frame-wrapper')
        box_frame_wrapper.classList.add('ssa-chat-bubble-frame-wrapper')
        document.body.appendChild(box_frame_wrapper)
            
        //inner
        box_frame = document.createElement('iframe');
        box_frame.setAttribute('id','ssa-chat-bubble-chat-frame')
        box_frame.setAttribute('scrolling','no')
        var html = '<head><link rel="stylesheet" href="' + inside_frame_css + '" type="text/css"/><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="ssa-chat-bubble-wrapper" style="display:none;"> <div id="ssa-chat-bubble-full"> <div id="ssa-chat-bubble-header"> <strong>YOUR_NAME_HERE</strong> <div class="close"> <img src="' + base_url + '/img/close.png" alt=""/> </div></div><div id="ssa-chat-bubble-messages"><div><div class="default">DEFAULT_MESSAGE</div></div></div><div id="ssa-chat-bubble-mask"></div><div id="ssa-chat-bubble-get-email" class="ssa-chat-bubble-has-input"> <p>EMAIL_REQUIRED_MESSAGE</p><input type="email" placeholder="your@email.com"/> <span class="submit-button"> <img src="' + base_url + '/img/send.png" alt="" width="32" height="29"/> </span> </div><div id="ssa-chat-bubble-chat" class="ssa-chat-bubble-has-input"> <form action="' + base_url + '/contact" method="post"> <textarea required name="message" placeholder="MESSAGE_PROMPT" id="ssa-chat-bubble-message"></textarea><input type="email" required name="email" id="ssa-chat-bubble-email"/> <a id="by" href="https://stupidlysimple.app/?utm_source=chat_bubble_widget" target="_blank">powered by <span>stupidly simple</span></a> <span class="submit-button"> <img src="' + base_url + '/img/send.png" alt=""/> </span> </form> </div></div></div></body>';
        box_frame_wrapper.appendChild(box_frame);
        box_frame.contentWindow.document.open();
        box_frame.contentWindow.document.write(html);
        box_frame.contentWindow.document.close(); 
    }

    function add_listeners(){
        button_frame.contentDocument.getElementById("ssa-chat-bubble-button").addEventListener("click", function(){
            toggle_box()
        });

        box_frame.contentDocument.getElementsByClassName('close')[0].addEventListener("click", function(){
            toggle_box()
        });

    }

    /******** starting point for your widget ********/
    function main() {
        //your widget code goes here                    

        settings = window.SSAChatBubbleSettings; 

        base_url = 'https://api.stupidlysimple.app'        
        if(settings.dev){
            base_url = 'http://localhost:8000'
        }

        //build urls
        outside_frame_css = base_url + '/css/chatbubble-frames.css'
        inside_frame_css = base_url + '/css/chatbubble.css'
        chat_image = base_url + '/img/chat.png'

        //load frame css
        document.querySelector('head').innerHTML += '<link rel="stylesheet" href="' + outside_frame_css + '" type="text/css"/>'

        setup_button_frame()
        setup_box_frame()
        add_listeners()

    }

    main()
}();