import React from 'react';

import * as AiIcons from 'react-icons/ai';

const Sidebar = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text',
  },
  {
    title: 'Command Center',
    path: 'https://commandcenter.monster.com',
    icon: <AiIcons.AiFillDatabase />,
    cName: 'nav-text',
  },
  {
    title: 'Power BI Dashboard',
    path: 'https://monsterad.sharepoint/sites/mbi/ppc/Pages/default.aspx',
    icon: <AiIcons.AiFillCompass />,
    cName: 'nav-text',
  },
  {
    title: 'Haystack',
    path: 'https://haystack.monster.com',
    icon: <AiIcons.AiFillEye />,
    cName: 'nav-text',
  },
  {
    title: 'PPC SharePoint',
    path: 'https://monsterad.sharepoint/sites/csgroup/ppc/Forms/AllItems.aspx',
    icon: <AiIcons.AiFillCloud />,
    cName: 'nav-text',
  },
];

export default Sidebar;
