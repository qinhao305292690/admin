import Vue from 'vue';
import {
    Button,
    Input,
    Card,
    FormModel,
    Layout,
    Menu,
    Icon,
    Dropdown,
    Avatar,
    Modal,
    Table,
    message
} from 'ant-design-vue';
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
