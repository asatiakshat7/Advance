// Creating class for a likes button
class ToggleLike{
    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;
            // this is way of a writing ajax
            let count=parseInt($(self).attr('data-likes'));
            

            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
                success:function(data){
                    let likesCount=parseInt($(self).attr('data-like'));
                    if (data.data.deleted == true){
                        likesCount -= 1;
                    }else{
                        likesCount += 1;
                    }
                    console.log("Hii",likesCount);
    
                    $(self).attr('data-like',likesCount);
                    $(self).html(`${likesCount} Likes`);
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
}