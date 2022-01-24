import Component from '../Component';
import './footer.scss'


const footer = new Component({
    selector: '.app',
    template: `
        <footer class="footer">
            <div class="wrapper">
                <div class="footer-content">
                    <div class="footer-content__info">
                    &#169; 2022 KEYBOARD RACE | Разработчики:
                     <a class = "footer-content__info-link" target = "_blank" href = "https://github.com/oreshkevich">Henadzi</a>, 
                     <a class = "footer-content__info-link" target = "_blank" href = "https://github.com/denverden">Denverden</a>, 
                     <a class = "footer-content__info-link" target = "_blank" href = "https://github.com/Rusveld">Rusveld</a>
                    </div>
                    <a href = "https://rs.school/" target = "_blank" class="footer-content__logo"></a>
                </div>
            </div>
        </footer>
    `,
})


export default footer;