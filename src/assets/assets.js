import user_image from './user-image.png';
import vscode from './vscode.png';
import figma from './figma.png';
import git from './git.png';
import photoshop from './photoshop.png';
import illustrator from './illustrator.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import profile_img from './profile-img.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import footer_bg_color from './footer-bg-color.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { BsCodeSlash } from "react-icons/bs";
import { PiGraduationCapLight, PiBriefcaseLight } from "react-icons/pi";

// Object containing all imported image assets for easy access
export const assets = {
    user_image,
    vscode,
    figma,
    git,
    photoshop,
    illustrator,
    logo,
    logo_dark,
    profile_img,
    hand_icon,
    header_bg_color,
    footer_bg_color,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
};

// project data for the portfolio section
export const workData = [
    {
        title: 'Rexer',
        description: 'Web App',
        bgImage: '/rexer_cover.jpg',
        link: "https://rexer-notes.vercel.app",
    },
    {
        title: 'NuBlog',
        description: 'Web App',
        bgImage: '/nublog_cover.jpg',
        link: "https://nublog-blog.vercel.app",
    },
    {
        title: 'EcoSpark',
        description: 'Web App',
        bgImage: '/ecospark_cover.jpg',
        link: "https://ecospark-cleaning.vercel.app",
    },
    
]

// services data for the services section
export const serviceData = [
    { icon: assets.web_icon, title: 'Web design', description: 'Web development is the process of building, programming...', link: 'https://nublog-blog.vercel.app/blogs/6862b7905fb0475f26ad54e1' },
    { icon: assets.mobile_icon, title: 'Mobile app', description: 'Mobile app development involves creating software for mobile devices...', link: 'https://nublog-blog.vercel.app/blogs/6862b7b75fb0475f26ad54e5' },
    { icon: assets.ui_icon, title: 'UI/UX design', description: 'UI/UX design focuses on creating a seamless user experience...', link: 'https://nublog-blog.vercel.app/blogs/6862b97e5fb0475f26ad5527' },
    { icon: assets.graphics_icon, title: 'Graphics design', description: 'Creative design solutions to enhance visual communication...', link: 'https://nublog-blog.vercel.app/blogs/6862b9ba5fb0475f26ad552b' },
]

// personal information for the 'About Me' section cards
export const infoList = [
    { icon: BsCodeSlash, title: 'Languages', description: 'HTML, CSS, JavaScript, React JS, Python' },
    { icon: PiGraduationCapLight, title: 'Education', description: 'B.Tech in Computer Science' },
    { icon: PiBriefcaseLight, title: 'Projects', description: 'Built more than 5 projects' }
];

// tool icons for the 'About Me' section
export const toolsData = [
    assets.vscode, assets.photoshop,assets.illustrator, assets.figma, assets.git, 
];

// social media links for the footer
export const socialLinks = [
  { icon: FaFacebookF, href: 'https://facebook.com/Ms.Ashique.Rahman', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/ashq_rahmn', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/in/ashqrahmn', label: 'LinkedIn' },
  { icon: RiTwitterXFill, href: 'https://x.com/ashqrahmn', label: 'Twitter' },
];