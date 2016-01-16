// /// <reference path="../../../typings/mocha/mocha.d.ts" />
// 
// import chai, {expect}     from 'chai';
// import jsxChai            from 'jsx-chai';
// import React              from 'react';
// import TestUtils          from 'react-addons-test-utils';
// import MdlMenu            from '../../../src/app/components/mdl/MdlMenu';
// import MdlIcon            from '../../../src/app/components/mdl/MdlIcon';
// 
// //const expect = chai.expect;
// 
// describe('MdlMenu', () => {
//   let renderedMdlMenu;
//   //let menuList;
//   let menuItems;
//   const Menus = [
//     {name : 'menu1', disabled : false, mdlIconName : 'menu1Icon'},
//     {name : 'menu2', disabled : false, mdlIconName : 'menu2Icon'},
//     {name : 'menu3', disabled : false, mdlIconName : 'menuIcon'}
//   ];   
//   
//   beforeEach('render MdlMenu', ()=> {
//     renderedMdlMenu = TestUtils.renderIntoDocument(
//       <MdlMenu 
//         menuId="testMenu" 
//         menus={Menus} 
//       />
//     );
//     
//     renderedMdlIcon = TestUtils.renderIntoDocument(<MdlIcon />);
//     
//     //menuList        = TestUtils.scryRenderedDOMComponentsWithTag(renderedMdlMenu, 'ul');
//     menuItems       = TestUtils.scryRenderedDOMComponentsWithTag(renderedMdlMenu, 'li');
//   });
//  
//   
//   describe('MdlMenu items', ()=> {
//     it(`MdlMenu menu items should not be undefined`, () => {
//       expect(menuItems).to.not.be.undefined;
//     });
//     
//     it(`MdlMenu should contain MdlIcon component`, () => {
//       expect(renderedMdlMenu).to.include(<MdlIcon/>) ; 
//     });
//     
//     it(`MdlMenu should contains 0 menu items (since no click on menu button)`, () => {      
//       expect(menuItems.length).to.equal(0);
//     }); 
//   });
//   
//   
//   describe('MdlMenu button click', ()=> {
//     it(`should open menu`, () => {
//        throw 'to be implemented';
//     }); 
//   });  
// 
// });
