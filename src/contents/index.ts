import User from '../pages/user/user';
import { FiTool } from 'react-icons/fi';
import { RiTodoLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

export const sideMenuCon = [
  {
    path: 'user',
    title: '사용자 관리',
    component: User,
    icon: AiOutlineUser,
  },
  {
    path: 'content',
    title: '컨텐츠 관리',
    component: User,
    icon: RiTodoLine,
  },
  {
    path: 'admin',
    title: '관리자 관리',
    component: User,
    icon: FiTool,
  },
];
