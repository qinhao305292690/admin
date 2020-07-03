import Vue from 'vue';
import {
    Button,
    Select,
    Input,
    Card,
    FormModel,
    Layout,
    Menu,
    Icon,
    Dropdown,
    Avatar,
    Modal,
    InputNumber,
    Table,
    Tag,
    Col,
    Row,
    Popover,
    message
} from 'ant-design-vue';
Vue.use(Col);
Vue.use(Row);
Vue.use(Select);
Vue.use(InputNumber);
Vue.use(Tag);
Vue.use(Popover);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Table);
Vue.use(Avatar);
Vue.use(Modal);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Card);
Vue.use(FormModel );

Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
