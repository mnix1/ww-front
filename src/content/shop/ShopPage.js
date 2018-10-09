import React from 'react';
import AvailableResources from "../../component/resource/AvailableResources";
import ShopPageBook from "./ShopPageBook";
import {RESOURCE_SMALL} from "../../component/resource/Resource";
import ScreenPage from "../../component/page/ScreenPage";

export default class ShopPage extends React.PureComponent {
    render() {
        return <ScreenPage>
            <div>
                <AvailableResources size={RESOURCE_SMALL}/>
                <ShopPageBook/>
            </div>
        </ScreenPage>
    }
}