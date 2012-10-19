﻿/// <reference path="../classes/grid.js" />
/// <reference path="../services/FilterService.js" />
/// <reference path="../services/GridService.js" />
/// <reference path="../services/SelectionService.js" />
/// <reference path="../classes/grid.js" />
/// <reference path="../services/FilterService.js" />
/// <reference path="../services/GridService.js" />
/// <reference path="../services/SelectionService.js" />
/// <reference path="../services/RowService.js" />
/// <reference path="../services/TemplateService.js" />
/// <reference path="../services/SortService.js" />
/// <reference path="../../lib/jquery-1.8.2.min" />
/// <reference path="../../lib/angular.js" />
/// <reference path="../constants.js"/>
/// <reference path="../classes/footer.js" />
/// <reference path="../namespace.js" />
/// <reference path="../navigation.js"/>
/// <reference path="../utils.js"/>

ng.HeaderCell = function ($scope, col) {
    var self = this;

    this.colIndex = col.index;
    this.displayName = col.displayName;
    this.field = col.field;
    this.column = col;

    this.headerClass = col.headerClass;
    this.headerTemplate = col.headerTemplate;
    this.hasHeaderTemplate = col.hasHeaderTemplate;
    
    this.allowSort = col.allowSort;
    this.allowFilter = col.allowFilter;
    this.allowResize = col.allowResize;
    
    this.width = col.width;
    this.minWidth = col.minWidth;
    this.maxWidth = col.maxWidth;

    this.filter = {
        get: function () {
            return self.column.filter;
        },
        set: function (val) {
            self.column.filter = val;
        }
    };

    this.filterVisible = false;
    this._filterVisible = {
        get: function () {
            return self.allowFilter;
        },
        set: function (val) {
            self.filterVisible = val;
        }
    };
    
    this.sortAscVisible = (function () {
        return self.column.sortDirection === "asc";
    })();

    this.sortDescVisible = (function () {
        return self.column.sortDirection === "desc";
    })();

    this.noSortVisible = (function () {
        var sortDir = self.column.sortDirection;
        return sortDir !== "asc" && sortDir !== "desc";
    })();

    this.sort = function () {
        if (!self.allowSort()) {
            return; // column sorting is disabled, do nothing
        }
        var dir = self.column.sortDirection === "asc" ? "desc" : "asc";
        self.column.sortDirection = dir;
    };

    this.filterHasFocus = false;
    this.startMousePosition = 0;
    this.startMousePosition = 0;
    this.origWidth = 0;
    this.gripOnMouseUp = function () {
        $(document).off('mousemove');
        $(document).off('mouseup');
        document.body.style.cursor = 'default';
        return false;
    };
    this.onMouseMove = function (event) {
        var diff = event.clientX - self.startMousePosition;
        var newWidth = diff + self.origWidth;
        self.width(newWidth < self.minWidth ? self.minWidth : ( newWidth > self.maxWidth ? self.maxWidth : newWidth) );
        return false;
    };
    this.gripOnMouseDown = function (event) {
        self.startMousePosition = event.clientX;
        self.origWidth = self.width();
        $(document).mousemove(self.onMouseMove);
        $(document).mouseup(self.gripOnMouseUp);
        document.body.style.cursor = 'col-resize';
        event.target.parentElement.style.cursor = 'col-resize';
        return false;
    };
};