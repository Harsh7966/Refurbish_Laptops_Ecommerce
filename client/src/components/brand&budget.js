import { NavLink } from "react-router-dom"

export const BrandBudget = () => {
    return (
        <>

            <div class="flex flex-s lg:flex-row overflow-hidden brandBudget">
                {/* <!-- Shop by brand section --> */}
                <div class="lg:w-1/2 div1">
                    <h2 class="text-center font-bold text-xl mb-4 mt-7">Shop by brand</h2>
                    <div class="flex  justify-center">
                        <NavLink to="/category/filterData/65cbab2747f3a0198a40b577">
                            <img class="brand-image" src="brand1.webp" width="140px" alt="Dell" />
                        </NavLink>
                        <NavLink to="/category/filterData/65cc8888264789916da18e0f">
                            <img class="brand-image" src="brand2.webp" width="140px" alt="Apple" />
                        </NavLink>
                        <NavLink to="/category/filterData/65cc8866264789916da18bd4">
                            <img class="brand-image" src="brand3.webp" width="140px" alt="Lenovo" />
                        </NavLink>
                        <NavLink to="/category/filterData/65cbab3447f3a0198a40b59a">
                            <img class="brand-image" src="brand4.webp" width="140px" alt="HP" />
                        </NavLink>
                    </div>
                </div>

                {/* <!-- Shop by Budget section --> */}
                <div class="lg:w-1/2 div2">
                    <h2 class="text-center font-bold text-xl mb-4 mt-7">Shop by Budget</h2>
                    <div class="flex justify-center gap-2">
                        <NavLink to="/category/filterData/65dc3b8b824878c6039d0229">
                            <img class="budget-image" src="budget1.webp" width="140px" alt="Budget 1" />
                        </NavLink>
                        <NavLink to="/category/filterData/65cbab5547f3a0198a40b5f0">
                            <img class="budget-image" src="budget2.webp" width="140px" alt="Budget 2" />
                        </NavLink>
                        <NavLink to="/category/filterData/65dc3bbb824878c6039d04b2">
                            <img class="budget-image" src="budget3.webp" width="140px" alt="Budget 3" />
                        </NavLink>
                        <NavLink to="/category/filterData/65dc3bd0824878c6039d05c9">
                            <img class="budget-image" src="budget3.webp" width="140px" alt="Refurbished" />
                        </NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}