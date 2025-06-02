const Information = () => {
    return (
        <div className="bg-white p-6 rounded-lg">
            <div className="mb-4"><span className="border-l-4 border-solid border-blue-700 mr-2"></span>
                <h1 className="text-xl inline-block uppercase font-semibold m-0">Thông tin chi tiết</h1></div>
            <div>
                <strong className="text-grey-80">Địa chỉ: </strong>
                <span className="text-grey-80">116 Nguyễn Du, Quận 1, Tp.HCM</span>
            </div>

            <div>
                <strong className="text-grey-80">Số điện thoại: </strong>
                <span className="text-grey-80">1900 2224</span>
            </div>

            <div className="cinema__map-embed my-4"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.500360144465!2d106.69119831435039!3d10.772936992323917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3c0189fa2b%3A0x6e75dc36d4dba07d!2sGalaxy+Nguy%E1%BB%85n+Du!5e0!3m2!1svi!2s!4v1517371343633" className="w-full h-[250px]"></iframe></div>

            <div>
                Là rạp chiếu đầu tiên và đông khách nhất trong hệ thống, Galaxy Nguyễn Du chính thức đi vào hoạt động từ ngày 20/5/2005 và được xem là một trong những cụm rạp mang tiêu chuẩn quốc tế hiện đại bậc nhất đầu tiên xuất hiện tại Việt Nam. Galaxy Nguyễn Du là một trong những rạp chiếu phim tiên phong mang đến cho khán giả những trải nghiệm phim chiếu rạp tốt nhất.    Galaxy Nguyễn Du gồm 5 phòng chiếu với hơn 1000 chỗ ngồi, trong đó có 1 phòng chiếu phim 3D và 4 phòng chiếu phim 2D, với hơn 1000 chỗ ngồi được thiết kế tinh tế giúp khách hàng có thể xem những bộ phim hay một cách thoải mái và thuận tiện nhất. Chất lượng hình ảnh rõ nét, âm thanh Dolby 7.1 cùng màn hình chiếu kỹ thuật 3D và Digital vô cùng sắc mịn, mang đến một không gian giải trí vô cùng sống động.   Bên cạnh đó, với lợi thế gần khu vực sầm uất bậc nhất ở trung tâm thành phố, bãi để xe rộng rãi, có tiệm cafe ngoài trời – đây là nơi cực thu hút bạn trẻ đến xem phim và check-in.
            </div>
        </div>
    );
}
export default Information;