import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHorseHead,
  faCow,
  faTree,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import {
  CalendarOutlined,
  AimOutlined,
  BorderOutlined,
  BlockOutlined,
  LogoutOutlined,
  z,
} from '@ant-design/icons'
import { FaBeer } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

export const menuItem = [
  getItem(
    <Link to="/schedule">Lịch trình</Link>,
    '/',
    <FontAwesomeIcon icon={CalendarOutlined} />
  ),
  getItem(
    <Link to="/task">Công việc</Link>,
    '/task',
    <FontAwesomeIcon icon={AimOutlined} />
  ),
  getItem(
    <Link to="/area">Khu vực</Link>,
    '/area',
    <FontAwesomeIcon icon={BorderOutlined} />
  ),
  getItem(
    <Link to="/zone">Vùng</Link>,
    '/zone',
    <FontAwesomeIcon icon={BlockOutlined} />
  ),
  getItem(
    <Link to="/animals">Vật nuôi</Link>,
    '/animals',
    <FontAwesomeIcon icon={faHorseHead} />
  ),
  getItem(
    <Link to="/animal-group">Chuồng</Link>,
    '/animal-group',
    <FontAwesomeIcon icon={faCow} />
  ),
  getItem(
    <Link to="/plants">Cây trồng</Link>,
    '/plants',
    <FontAwesomeIcon icon={faTree} />
  ),
  getItem(
    <Link to="/crop-group">Vườn</Link>,
    '/crop-group',
    <FontAwesomeIcon icon={faSeedling} />
  ),
  getItem(
    <Link to="/login">Đăng xuất</Link>,
    '/login',
    <FontAwesomeIcon icon={LogoutOutlined} />
  ),
]

export const rootSubmenuKeys = ['sub3', 'sub4']
