import React, { Component } from "react";
// import { NamespacesConsumer } from "react-i18next";
import SidebarAccordion from "../../../../components/accordion/sidebarAccordion";
class ListAside extends Component {
    constructor() {
        super();
        this.filterPanel = React.createRef();
        this.state = {
            isopened: false,
            showComponent: false,

        };
        this.openFilterPanel = this.openFilterPanel.bind(this);
    }

    componentDidMount() {
        const setComponentVisibility = this.setComponentVisibility.bind(this);
        setComponentVisibility(document.documentElement.clientWidth);
        window.addEventListener("resize", function () {
            setComponentVisibility(document.documentElement.clientWidth);
        });
    }

    setComponentVisibility(width) {
        if (width > 768) {
            this.setState({ showComponent: true });
        } else {
            this.setState({ showComponent: false, isopened: false });
        }
    }

    toggleClass = () => {
        document.body.classList.toggle("u-overflow-hidden");
        this.setState(prevState => ({
            isopened: !prevState.isopened,
            showComponent: !prevState.showComponent,
        }));
    };

    openFilterPanel() {
        if (this.state.showComponent === false) {
            this.setState(
                {
                    showComponent: true,
                    isopened: true,
                },
                () => {
                    let currentPosition = window.pageYOffset;
                    this.filterPanel.current.style.top = `${currentPosition}px`;
                    document.body.classList.toggle("u-overflow-hidden");
                }
            );
        }
    }

    render() {
        return (
            <aside className="list__aside">
                <SidebarAccordion
                    onFilterChecked={this.props.onFilterChecked}
                    data={this.props.brandsList}
                    title="Brands"
                    id="brand"
                />
            </aside>
        );
    }
}

export default ListAside;
