sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("zprojectteste0404.controller.Main", {
            onInit: function () {
                let datas = {
                title: {
                        subTitle : 'Json Title'
                    },
                list: [
                    {num1:33, oper:'+', num2:10, result:43}
                //     {name: 'moon', age :20},
                //     {name: 'hong', age :21},
                //     {name: 'kim', age :22},
                //     {name: 'park', age :23},
                //     {name: 'song', age :24},
                ],
                todo : [
                    {content : 'test'} //객체형태의 데이터가 와야한다.
                ],
            };
                // var oModel = new JSONModel(); // JSONModel 객체 생성 / data.json 파일 데이터를 oModel에 넣을꺼임.
                // oModel.loadData( sap.ui.require.toUrl("zprojecttest0404/model/data.json"));
                this.getView().setModel(new JSONModel(datas), 'MainModel'); //json모델 객체를 만들고 이름을 MainModel(모델이름)로 만듦.
            },
            onChange: function() {
                var oModel = this.getView().getModel("MainModel");
                /*데이터 호출하는 방법(2가지)*/
                // var oData = oModel.getData(); // 전체 데이터를 다 가져와서 oData 변수에 받음.
                
                // console.log('변경 전 :', oData.title.subTitle);
                // oData.title.subTitle = 'change Title';
                /* list[4]의 age 값만 100으로 변경해보기 */

                // oModel.getProperty("/title/subTitle");
                // oModel.setProperty("/title/subTitle", 'hihi');
                // console.log("변경 전 ", oData.list[4].age);
                // oData.list[4].age = 100;

                oModel.setData(oData); // 데이터 전체 바꿈.
                
                /*
                    MainModel {
                        ..
                        list : [ {name: 'moon', age :20}]
                    }
                    위 모델의 데이터 중 list 배열 안에 첫번째 데이터의 'moon'이라는 문자열을 얻어, Page의 title 속성에 setting해보기.
                */
                    // var moonNam = '';
                    // moonNam = oData.list[0].name;
                    // var moonNam = oData.list[1].name;
                    // this.byId('idText').setText(moonNam);

                oModel.getProperty("/title/subTitle"); // 특정 경로에 해당하는 데이터를 가져옴.
                var oData = oModel.getProperty("/title/subTitle");
                console.log('변경 전 :', oData.title.subTitle);
                oModel.setProperty("/title/subTitle",'Change Title');
            },
            onDisplay: function() {
                var oModel = this.getView().getModel("MainModel");
                // var oData = oModel.getData();
                // console.log("변경 후 ",oData.list[4].age);
                var oData = oModel.getProperty("/title/subTitle");
                console.log('변경 후', oData.title.subTitle);
                
                
            },
            onButtonPress: function() {
                var oModel = this.getView().getModel("MainModel"),
                    aList = oModel.getData().list; // [{..}]
                var oSelect = this.byId("idSelect").getSelectedItem(),
                    iNum1 = Number(this.byId("idInput1").getValue()),
                    iNum2 = Number(this.byId("idInput2").getValue()),
                    result = 0;

                let sMsg = '';

                /* 계산기 로직 작성 => switch - case 
                    oSelect.getKey() => * - / + 의 키 값을 가져왔으니까
                    해당 키 값으로 분기처리하여 결과 값을 얻는다.
                */

                switch(oSelect.getKey()){
                    case 'plus': 
                        result = iNum1 + iNum2;
                        break;
                    case 'minus':
                        result = iNum1 - iNum2; 
                        break;
                    case 'multiple': 
                        result = iNum1 * iNum2;
                        break;
                    case 'divide':
                        result = iNum1 / iNum2; 
                        break;
                }

                sMsg = `${iNum1} ${oSelect.getText()} ${iNum2} = ${result} `;
                
                aList.push({
                    num1: iNum1,
                    oper: oSelect.getText(),
                    num2: iNum2,
                    result: result
                });

                oModel.setProperty("/list", aList);
                MessageBox.show(
                    sMsg, {
                        icon: MessageBox.Icon.INFORMATION,
                        title: "My message box title",
                        actions: [MessageBox.Action.YES,'NO'],
                        emphasizedAction: MessageBox.Action.YES,
                        onClose: function (oAction) {
                            if(oAction === 'YES') {
                                aList.push({
                                    num1: iNum1,
                                    oper: oSelect.getText(),
                                    num2 : iNum2,
                                    result:result
                                });
                                oModel.setProperty("/list", aList);
                            }
                         }
                    }
                );
            },
            onAdd : function(){
                //Dialog 호출
                var oDialog = this.byId("addDialog");

                if(oDialog) {
                    oDialog.open();
                    return;
                }

                this.loadFragment({
                    name : "zprojectteste0404.view.fragment.addDialog",
                }).then(function(oDialog){
                    oDialog.open();
                }, this); 
            },
            onClose: function(oEvent){
                var oDialog = oEvent.getSource().getParent(); //버튼 객체(getSource) > 부모:dialog객체
                // var sValue = oDialog.getContent()[0].getItems()[1].getValue();

                // console.log(sValue);
                var sValue = this.getView().getModel("root").getProperty("/value");
                var oModel = this.getView().getModel("MainModel"),
                    todoList = oModel.getData().todo;

                console.log(sValue);             
                
                if (sValue) {
                    todoList.unshift({
                        content : sValue
                    });
                    oModel.setProperty("/content",todoList); //todoList:새로 세팅할 데이터.
                }
                oDialog.close();
            },
            onBeforeOpen: function(){
                this.byId("addInput").setValue();
            },
            onDelete: function() {
                var oTable = this.byId("todoTable"); 
                var oModel = this.getView().getModel("MainModel");
                var aSelectedIndices = oTable.getSelectedIndices();
                var aDatas = oModel.getProperty("/todo");
                var sMsg2 = "정말 삭제하시겠습니까?";
                
                MessageBox.show(
                    sMsg2, {
                        icon: MessageBox.Icon.INFORMATION,
                        title: "Delete",
                        actions: [MessageBox.Action.YES,'NO'],
                        emphasizedAction: MessageBox.Action.YES,
                        onClose: function (oAction) {
                            if(oAction === 'YES') {
                                for(var i=aSelectedIndices.length-1; i>=0; i--){
                                    aDatas.splice(aSelectedIndices[0], 1); //index, 자리수
                                    oModel.getProperty("/todo", aDatas);           
                                }
                                oModel.setProperty("/todo", aDatas);
                            }
                         }
                    }
                ); 
            },
            onRowDelete: function(oEvent){
                var oModel = this.getView().getModel("MainModel");
                var aDatas = oModel.getProperty("/todo");
                var selIndx =oEvent.getParameters().row.getIndex();

                /* 단 건 삭제 로직 */
                aDatas.splice(selIndx, 1);
                oModel.setProperty("/todo", aDatas);
            }
        });
    });
