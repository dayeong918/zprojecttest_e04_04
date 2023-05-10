<mvc:View controllerName="zprojectteste0404.controller.Main"
    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"
    xmlns="sap.m" xmlns:t="sap.ui.table" xmlns:l="sap.ui.layout" xmlns:core="sap.ui.core">
    <Page id="page" title="{MainModel>/title/subTitle}">
        <content>
            <Button text="change" press="onChange"/>
            <Button text="display" press="onDisplay"/>
            <Text 
			id="idText" text="{MainModel>/list/0/name}"/>

			<l:VerticalLayout>
                <Input id="idInput1"/>
                <Select id="idSelect" width="100%">
                    <items>
                        <core:Item key="plus" text="+"/>
                        <core:Item key="minus" text="-"/>
                        <core:Item key="multiply" text="*"/>
                        <core:Item key="divide" text="/"/>
                    </items>
                </Select>
                <Input id="idInput2"/>
                <Button width="100%" text="Button Text" type="Emphasized" press="onButtonPress"/>
            </l:VerticalLayout>

            <t:Table
				rows="{MainModel>/list}"
				selectionMode="MultiToggle"
				visibleRowCount="7"
				paste="onPaste"
				ariaLabelledBy="title">
				<t:extension>
					<OverflowToolbar style="Clear">
						<Title id="title" text="Calculation"/>
						<ToolbarSpacer />
					</OverflowToolbar>
				</t:extension>
				<t:columns>
					<t:Column>
						<Label text="Num1" />
						<t:template>
							<Text text="{MainModel>num1}" wrapping="false" />
						</t:template>
					</t:Column>
                    <t:Column>
						<Label text="Operator" />
						<t:template>
							<Text text="{MainModel>oper}" wrapping="false" />
						</t:template>
					</t:Column>
					<t:Column>
						<Label text="Num2" />
						<t:template>
							<Text text="{MainModel>num2}" wrapping="false" />
						</t:template>
					</t:Column>
					<t:Column>
						<Label text="Result" />
						<t:template>
							<Text text="{MainModel>result}" wrapping="false" />
						</t:template>
					</t:Column>
				</t:columns>
			</t:Table>

			<t:Table 
				id="todoTable"
				rowActionCount="1"
				rows="{MainModel>/todo}"
				selectionMode="MultiToggle"
				visibleRowCount="7"
				paste="onPaste"
				ariaLabelledBy="title">
				<t:extension>
					<OverflowToolbar style="Clear">
						<Title text="Todo List"/>
						<ToolbarSpacer />
						<Button icon="sap-icon://add" press="onAdd"/>
						<Button icon="sap-icon://delete" press="onDelete"/>
					</OverflowToolbar>
				</t:extension>
				<t:columns>
					<t:Column>
						<Label text="Content" />
						<t:template>
							<Text text="{MainModel>content}" wrapping="false" />
						</t:template>
					</t:Column>
				</t:columns>
				<t:rowActionTemplate>
					<t:RowAction >
						<t:items>
							<t:RowActionItem type="Delete" press="onRowDelete" icon="sap-icon://decline"/>
						</t:items>
					</t:RowAction>
				</t:rowActionTemplate>
			</t:Table>
        </content>
    </Page>
</mvc:View>
