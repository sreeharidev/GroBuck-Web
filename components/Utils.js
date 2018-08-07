import $ from 'jquery';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class Utils {
  ajaxPost(data,serviceId,CONST){
      console.log('input');
      console.log(data);
      data = JSON.stringify(data);
      $.ajax({
        url : "service",
        type: "POST",
        data : "json="+JSON.stringify(data)+"&serviceId="+serviceId,
        success: function(response, textStatus, jqXHR){
          AppDispatcher.handleAction({
                    actionType: CONST,
                    data: response
          });
        },
        error: function (jqXHR, textStatus, errorThrown){

        }
      });
  }
}