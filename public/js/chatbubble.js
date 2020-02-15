var ssa_chatbubble = function () {    

    var settings, base_url, outside_frame_css, inside_frame_css, chat_image, button_frame_wrapper, box_frame_wrapper, button_frame, box_frame
    
    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    }

    function hide_box(){
        button_frame.contentDocument.getElementById('ssa-chat-bubble-button').setAttribute('class','');
        box_frame_wrapper.style.display = 'none'
    }
    function show_box(){
        button_frame.contentDocument.getElementById('ssa-chat-bubble-button').setAttribute('class','open');
        box_frame_wrapper.style.display = 'block'
    }
    function toggle_box(){
        if(isHidden(box_frame_wrapper)){
            show_box()
        }else{            
            hide_box()
        }

    }

    function swap_colors(){
        // box_frame.find('#chatthingy-get-email p').css('background-color',settings.color);            
        // box_frame.find('#chatthingy-chat #by span').css('color',settings.color);
        // button_frame.find('#chatthingy-button').css('background-color',settings.color);               box_frame.find('#chatthingy-header').css('background-color',settings.color);
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
        var html = '<head><link rel="stylesheet" href="' + inside_frame_css + '" type="text/css"/><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="ssa-chat-bubble-wrapper" style="display:none;"> <div id="ssa-chat-bubble-full"> <div id="ssa-chat-bubble-header"> <strong>' + settings.title + '</strong> <div class="close"> <img src="' + base_url + '/img/close.png" alt=""/> </div></div><div id="ssa-chat-bubble-messages"><div><div class="default">' + settings.welcome_message + '</div></div></div><div id="ssa-chat-bubble-mask"></div><div id="ssa-chat-bubble-get-email" class="ssa-chat-bubble-has-input"><p>' + settings.email_required_message + '</p><input type="email" id="ssa-chat-bubble-email-input" placeholder="your@email.com"/> <span class="submit-button" id="email-submit-button"> <img src="' + base_url + '/img/send.png" alt="" width="32" height="29"/> </span> </div><div id="ssa-chat-bubble-chat" class="ssa-chat-bubble-has-input"> <form action="' + base_url + '/contact" method="post"> <textarea required name="message" placeholder="' + settings.message_prompt + '" id="ssa-chat-bubble-message"></textarea><input type="email" required name="email" id="ssa-chat-bubble-email"/> <a id="by" href="https://stupidlysimple.app/?utm_source=chat_bubble_widget" target="_blank">powered by <span>stupidly simple</span></a> <span class="submit-button" id="message-submit-button"> <img src="' + base_url + '/img/send.png" alt=""/> </span> </form> </div></div></div></body>';
        box_frame_wrapper.appendChild(box_frame);
        box_frame.contentWindow.document.open();
        box_frame.contentWindow.document.write(html);
        box_frame.contentWindow.document.close(); 
    }

    var observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on'+event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }    

    function add_listeners(){

        //when button is pressed
        button_frame.contentDocument.getElementById("ssa-chat-bubble-button").addEventListener("click", function(){
            toggle_box()
        });

        //when close icon is pressed
        box_frame.contentDocument.getElementsByClassName('close')[0].addEventListener("click", function(){
            toggle_box()
        });

        var message_area = box_frame.contentDocument.getElementById('ssa-chat-bubble-message')
        function resize () {
            var content_length = message_area.value.length
            if(content_length == 0){
                box_frame.contentDocument.getElementById("message-submit-button").style.display = 'none'
                box_frame.contentDocument.getElementById("by").style.display = 'block'
            }else{
                box_frame.contentDocument.getElementById("message-submit-button").style.display = 'block'
                box_frame.contentDocument.getElementById("by").style.display = 'none'
            }            
            message_area.style.height = 'auto';
            message_area.style.height = message_area.scrollHeight+'px';
        }
        function delayedResize () {
            window.setTimeout(resize, 0);
        }

        //when textarea is typed in
        observe(message_area, 'change',  resize);
        observe(message_area, 'cut',     delayedResize);
        observe(message_area, 'paste',   delayedResize);
        observe(message_area, 'drop',    delayedResize);
        observe(message_area, 'keydown', delayedResize);

        message_area.focus();
        message_area.select();
        resize(); 
        
        box_frame.contentDocument.getElementById("message-submit-button").click(function(){
            console.log('message submit button')
            submit_textarea();
        }); 
    }    

    function submit_textarea(){
        //check to see if we have an email address for this person.
        if(settings.email){ //if so and it's fresh, send this message through.
            submit_message();
        }
        else{ //if not, get the email.
            box_frame.contentDocument.getElementById('chatthingy-full').classList.add('get-email');
            box_frame.contentDocument.getElementById('ssa-chat-bubble-email-input').focus();
            enter_email();
        }
    }

    function enter_email(){
        box_frame.contentDocument.getElementById('ssa-chat-bubble-email-input').addEventListener("click", function(e){
            if(e.which == 13){  // the enter key code
                e.preventDefault();
                submit_email();
            }
        });
        

        box_frame.contentDocument.getElementById('email-submit-button').addEventListener("click", function(){
            submit_email();
        });
        
    }

    function submit_email(){
        // var email = chat_frame.find('#chatthingy-get-email input').val();
        // if(is_valid_email_address(email)){
        //     chat_frame.find('#chatthingy-full form input[name="email"]').val(email);
        //     Cookies.set('chatthingy-email-' + settings.app_id, email, { expires: 365 });
        //     settings.email = email;
        //     submit_message();            
        // }else{
        //     //flash an error
        //     console.log('invalid email address');
        // }     
    }

    /******** starting point for your widget ********/
    function main() {
        //your widget code goes here                    

        settings = window.SSAChatBubbleSettings;         
        base_url = 'https://api.stupidlysimple.app'        

        if(settings.dev){
            base_url = 'http://localhost:8000'
        }
        
        settings.title = 'How Can I Help?'
        settings.welcome_message = 'Hey there! Is there anything I can help you with? Send me a message and I’ll get back to you ASAP.'
        settings.message_prompt = 'Drop me a line.'
        settings.email_required_message = 'Please leave your email address so I can get back to you.'
        
        if(settings.we){
            settings.title = 'How Can We Help?'
            settings.welcome_message = 'Hey there! Is there anything we can help you with? Send us a message and we’ll get back to you ASAP.'
            settings.message_prompt = 'Drop us a line.'
            settings.email_required_message = 'Please leave your email address so we can get back to you.'
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

    return {
        open: function(){
            show_box();
        },
        close: function (){
            hide_box();
        },
        toggle: function(){
            toggle_box();
        }
    };  

}();