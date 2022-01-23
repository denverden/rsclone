import Component from '../Component';
import './footer.scss'


const footer = new Component({
    selector: '.app',
    template: `
        <footer class="footer">
            <div class="wrapper">
                <div class="footer-content">
                    <div class="footer-content__info">&#169; 2022 KEYBOARD RACE | Разработчики: Henadzi, Denverden, Rusveld</div>
                    <div class="footer-content__logo"></div>
                </div>
            </div>
        </footer>
    `,
})


export default footer;