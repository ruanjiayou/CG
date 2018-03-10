/**
 * 作者: 阮家友
 * 时间: 2018-3-10 16:22:19
 * 描述: webpack模块中的js类,前端中无法访问,在这里挂载到window
 */
import CGraph from './CGraph';
import CPoint from './CPoint';
import CParticle from './CParticle';
import CParticleSystem from './CParticleSystem';
import CColor from 'color-helper';

window.CGraph = CGraph;
window.CPoint = CPoint;
window.CParticle = CParticle;
window.CParticleSystem = CParticleSystem;
window.CColor = CColor;